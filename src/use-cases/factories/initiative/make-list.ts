import { PrismaInitiativeRepository } from '@/repositories/prisma/initiative-repository';
import { List } from '@/use-cases/initiative/list';

export function makeList() {
  const initiativeRepository = new PrismaInitiativeRepository();
  const listCase = new List(initiativeRepository);

  return listCase;
}
