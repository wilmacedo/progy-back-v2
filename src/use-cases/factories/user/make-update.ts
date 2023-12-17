import { PrismaUserRepository } from '@/repositories/prisma/user-repository';
import { Update } from '@/use-cases/user/update';

export function makeUpdate() {
  const userRepositoy = new PrismaUserRepository();
  const updateCase = new Update(userRepositoy);

  return updateCase;
}
