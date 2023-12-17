import { PrismaStateRepository } from '@/repositories/prisma/state-repository';
import { List } from '@/use-cases/state/list';

export function makeList() {
  const stateRepository = new PrismaStateRepository();
  const listCase = new List(stateRepository);

  return listCase;
}
