import { Prisma, Unit } from '@prisma/client';

export interface UnitRepository {
  list(options?: Prisma.UnitFindManyArgs): Promise<Unit[]>;
}
