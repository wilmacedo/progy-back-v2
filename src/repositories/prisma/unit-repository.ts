import { prisma } from '@/lib/prisma';
import { Prisma, Unit } from '@prisma/client';
import { UnitRepository } from '../unit-repository';

export class PrismaUnitRepository implements UnitRepository {
  async list(options?: Prisma.UnitFindManyArgs): Promise<Unit[]> {
    const units = await prisma.unit.findMany(options);

    return units;
  }
}
