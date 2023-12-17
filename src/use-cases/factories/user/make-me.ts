import { PrismaUserRepository } from '@/repositories/prisma/user-repository';
import { Me } from '@/use-cases/user/me';

export function makeMe() {
  const userRepository = new PrismaUserRepository();
  const meCase = new Me(userRepository);

  return meCase;
}
