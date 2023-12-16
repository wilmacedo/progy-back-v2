import { Planning } from '@prisma/client';
import { PlanningRepository } from '../planning-repository';

export class InMemoryPlanningRepository implements PlanningRepository {
  plannings: Planning[] = [];

  async list(): Promise<Planning[]> {
    return this.plannings;
  }
}
