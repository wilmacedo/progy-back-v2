import { PrismaUserRepository } from '@/repositories/prisma/user-repository';
import { UserListCase } from '@/use-cases/planning/user-list';

export function makeUserList() {
  const userRepository = new PrismaUserRepository();
  const userListCase = new UserListCase(userRepository);

  return userListCase;
}
