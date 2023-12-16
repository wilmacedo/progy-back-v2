import { PrismaUserRepository } from '@/repositories/prisma/user-repository';
import { RegisterUserUseCase } from '@/use-cases/user/register';

export function MakeRegisterUserCase() {
  const userRepository = new PrismaUserRepository();
  const registerUserUseCase = new RegisterUserUseCase(userRepository);

  return registerUserUseCase;
}
