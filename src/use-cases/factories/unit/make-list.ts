import { PrismaUnitRepository } from '@/repositories/prisma/unit-repository';
import { List } from '@/use-cases/unit/list';

export function makeList() {
  const unitRepository = new PrismaUnitRepository();
  const listCase = new List(unitRepository);

  return listCase;
}
