import { PrismaUserRepository } from '@/repositories/prisma/user-repository';
import { List } from '@/use-cases/user/list';

export function makeList() {
  const userRepository = new PrismaUserRepository();
  const listCase = new List(userRepository);

  return listCase;
}
