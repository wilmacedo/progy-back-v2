import { PrismaStageRepository } from '@/repositories/prisma/stage-repository';
import { List } from '@/use-cases/stage/list';

export function makeList() {
  const stageRepository = new PrismaStageRepository();
  const listCase = new List(stageRepository);

  return listCase;
}
