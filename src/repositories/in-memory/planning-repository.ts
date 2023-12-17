import { Planning } from '@prisma/client';
import { PlanningRepository } from '../planning-repository';

export class InMemoryPlanningRepository implements PlanningRepository {
  plannings: Planning[] = [];

  async list(): Promise<Planning[]> {
    return this.plannings;
  }

  async findById(id: number): Promise<Planning | null> {
    const planning = this.plannings.find(planning => planning.id === id);

    return planning || null;
  }
}
