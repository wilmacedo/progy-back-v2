import { ActivityRepository } from '@/repositories/activity-repository';
import { GoalRepository } from '@/repositories/goal-repository';
import { InitiativeRepository } from '@/repositories/initiative-repository';
import { PlanningRepository } from '@/repositories/planning-repository';
import { StageRepository } from '@/repositories/stage-repository';
import { StateRepository } from '@/repositories/state-repository';
import { AccessTokenData } from '@/types/access-token';
import { Activity, Initiative } from '@prisma/client';
import { isValid } from 'date-fns';
import { PlanningNotFoundError } from '../error/planning-not-found-error';

interface MetricsRequest {
  planningId: number;
  userData: AccessTokenData;
}

interface ModelInfo {
  percentage: number;
  value: number;
  title: string;
  id: number;
}

interface MetricsResponse {
  title: string;
  stagesPerInitiative: ModelInfo[];
  statusPerActivity: ModelInfo[];
  costIndicator: number[];
  idp: number[];
  totalGoals: number;
  totalDelayed: number;
  totalInitiatives: number;
  totalInitiativesDone: number;
}

export class Metrics {
  initiativeSize: number;
  initiativesDone: number;

  constructor(
    private planningRepository: PlanningRepository,
    private stageRepository: StageRepository,
    private initiativeRepository: InitiativeRepository,
    private stateRepository: StateRepository,
    private activityRepository: ActivityRepository,
    private goalRepository: GoalRepository,
  ) {
    this.initiativeSize = 0;
    this.initiativesDone = 0;
  }

  calculateInitiativesDone(initiatives: Initiative[]) {
    const targetName = 'concluído';
    const filtered = initiatives.filter(
      initiative =>
        (initiative as any).stages.name.toLowerCase() === targetName,
    );

    this.initiativeSize = initiatives.length;
    this.initiativesDone = filtered.length;
  }

  async getStagesPerInitiative(
    planning_id: number,
    { user }: AccessTokenData,
  ): Promise<ModelInfo[]> {
    const stages = await this.stageRepository.list({ where: { planning_id } });

    const initiatives = await this.initiativeRepository.list({
      include: {
        stages: {
          select: { name: true },
        },
      },
      where: {
        planning_id: planning_id,
        ...(user.unit_id !== undefined &&
          user.unit_id !== null && { unit_id: user.unit_id }),
      },
    });

    this.calculateInitiativesDone(initiatives);

    const result = stages.map(stage => {
      const filteredStages = initiatives.filter(
        initiative => initiative.stage_id === stage.id,
      );

      return {
        percentage: (filteredStages.length / initiatives.length) * 100,
        value: filteredStages.length,
        title: stage.name,
        id: stage.id,
      };
    });

    return result;
  }

  async getStatusPerActivity(
    planning_id: number,
    activities: Activity[],
  ): Promise<ModelInfo[]> {
    const states = await this.stateRepository.list({ where: { planning_id } });

    const result = states.map(state => {
      const filteredActivities = activities.filter(
        activity => activity.state_id === state.id,
      );

      return {
        percentage: (filteredActivities.length / activities.length) * 100,
        value: filteredActivities.length,
        title: state.name,
        id: state.id,
      };
    });

    return result;
  }

  delayedActivities(activities: Activity[]) {
    const result = activities.filter(activity => {
      const oneDay = 24 * 60 * 60 * 1000;
      const today = new Date().getTime();
      const date = new Date(activity.date_end).getTime();

      const doneDate = Math.round((date - today) / oneDay);
      const doneStates = ['Concluído', 'Suspenso'];

      if (doneDate < 0 && !doneStates.includes((activity as any).states.name)) {
        return activity;
      }
    });

    return result;
  }

  calculateCost(activities: Activity[]): number[] {
    let cost = activities
      .map(activity => Number(activity.value))
      .reduce((acc, curr) => acc + curr, 0);

    const targetName = 'concluído';
    const done = activities
      .filter(
        activity => (activity as any).states.name.toLowerCase() === targetName,
      )
      .map(activity => Number(activity.value))
      .reduce((acc, curr) => acc + curr, 0);

    if (cost === 0 && done === 0) cost = 1;

    return [cost, done];
  }

  calculateIDP(activities: Activity[]) {
    activities = activities.filter(activity => {
      const date = activity.date_end;

      if (isValid(date)) {
        return date.getFullYear() <= new Date().getFullYear();
      }
    });

    const dones = activities.filter(
      activity => (activity as any).states.name === 'Concluído',
    );
    const pendings = activities.filter(
      activity => (activity as any).states.name !== 'Concluído',
    );

    return [dones.length, pendings.length];
  }

  async execute({ planningId, userData }: MetricsRequest) {
    const planning = await this.planningRepository.findById(planningId);
    if (!planning) {
      throw new PlanningNotFoundError();
    }

    const stagesPerInitiative = await this.getStagesPerInitiative(
      planningId,
      userData,
    );

    const activities = await this.activityRepository.list({
      include: {
        states: { select: { name: true } },
        initiatives: { select: { unit_id: true } },
      },
      where: {
        planning_id: planningId,
        ...(userData.user.unit_id !== undefined &&
          userData.user.unit_id !== null && {
            initiatives: {
              unit_id: userData.user.unit_id,
            },
          }),
      },
    });
    const statusPerActivity = await this.getStatusPerActivity(
      planningId,
      activities,
    );
    const delayed = this.delayedActivities(activities);
    const costIndicator = this.calculateCost(activities);
    const idp = this.calculateIDP(activities);
    const totalGoals = await this.goalRepository.count({
      where: { planning_id: planningId },
    });

    const result: MetricsResponse = {
      title: planning.name,
      stagesPerInitiative,
      statusPerActivity,
      costIndicator,
      idp,
      totalGoals,
      totalDelayed: delayed.length,
      totalInitiatives: this.initiativeSize,
      totalInitiativesDone: this.initiativesDone,
    };

    return { result };
  }
}
