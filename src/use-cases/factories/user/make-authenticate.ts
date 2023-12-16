import { PrismaUserRepository } from '@/repositories/prisma/user-repository';
import { AuthenticateUseCase } from '@/use-cases/user/authenticate';

export function MakeAuthenticateCase() {
  const userRepository = new PrismaUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository);

  return authenticateUseCase;
}
