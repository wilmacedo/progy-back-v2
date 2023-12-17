import { Planning, Prisma } from '@prisma/client';

export interface PlanningRepository {
  list(options?: Prisma.PlanningFindManyArgs): Promise<Planning[]>;
  findById(id: number): Promise<Planning | null>;
}
