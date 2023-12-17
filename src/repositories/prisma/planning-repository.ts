import { prisma } from '@/lib/prisma';
import { Planning, Prisma } from '@prisma/client';
import { PlanningRepository } from '../planning-repository';

export class PrismaPlanningRepository implements PlanningRepository {
  async list(options?: Prisma.PlanningFindManyArgs): Promise<Planning[]> {
    const plannings = await prisma.planning.findMany(options);

    return plannings;
  }

  async findById(id: number): Promise<Planning | null> {
    const planning = await prisma.planning.findUnique({ where: { id } });

    return planning;
  }
}
