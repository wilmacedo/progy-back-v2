import { PrismaPlanningRepository } from '@/repositories/prisma/planning-repository';
import { List } from '@/use-cases/planning/list';

export function makeListCase() {
  const planningRepository = new PrismaPlanningRepository();
  const listCase = new List(planningRepository);

  return listCase;
}
