import { PrismaGoalRepository } from '@/repositories/prisma/goal-repository';
import { List } from '@/use-cases/goal/list';

export function makeList() {
  const goalRepository = new PrismaGoalRepository();
  const listCase = new List(goalRepository);

  return listCase;
}
