import { PrismaMappRepository } from '@/repositories/prisma/mapp-repository';
import { List } from '@/use-cases/mapp/list';

export function makeList() {
  const mappRepository = new PrismaMappRepository();
  const listCase = new List(mappRepository);

  return listCase;
}
