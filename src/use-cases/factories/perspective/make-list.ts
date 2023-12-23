import { PrismaPerspectiveRepository } from '@/repositories/prisma/perspective-repository';
import { List } from '@/use-cases/perspective/list';

export function makeList() {
  const perspectiveRepository = new PrismaPerspectiveRepository();
  const listCase = new List(perspectiveRepository);

  return listCase;
}
