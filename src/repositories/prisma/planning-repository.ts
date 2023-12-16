import { prisma } from '@/lib/prisma';
import { Planning, Prisma } from '@prisma/client';
import { PlanningRepository } from '../planning-repository';

export class PrismaPlanningRepository implements PlanningRepository {
  async list(options?: Prisma.PlanningFindManyArgs): Promise<Planning[]> {
    const plannings = await prisma.planning.findMany(options);

    return plannings;
  }
}
