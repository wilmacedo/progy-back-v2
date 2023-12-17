import { PrismaUserRepository } from '@/repositories/prisma/user-repository';
import { Redirect } from '@/use-cases/email/redirect';

export function makeRedirect() {
  const userRepository = new PrismaUserRepository();
  const redirectCase = new Redirect(userRepository);

  return redirectCase;
}
