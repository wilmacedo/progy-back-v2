import { PrismaActivityRepository } from '@/repositories/prisma/activity-repository';
import { PrismaGoalRepository } from '@/repositories/prisma/goal-repository';
import { PrismaInitiativeRepository } from '@/repositories/prisma/initiative-repository';
import { PrismaPlanningRepository } from '@/repositories/prisma/planning-repository';
import { PrismaStageRepository } from '@/repositories/prisma/stage-repository';
import { PrismaStateRepository } from '@/repositories/prisma/state-repository';
import { Metrics } from '@/use-cases/planning/metrics';

export function makeMetricsCase() {
  const planningRepository = new PrismaPlanningRepository();
  const stageRepository = new PrismaStageRepository();
  const initiativeRepository = new PrismaInitiativeRepository();
  const stateRepository = new PrismaStateRepository();
  const activityRepository = new PrismaActivityRepository();
  const goalRepository = new PrismaGoalRepository();
  const metrics = new Metrics(
    planningRepository,
    stageRepository,
    initiativeRepository,
    stateRepository,
    activityRepository,
    goalRepository,
  );

  return metrics;
}
