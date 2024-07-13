import { PrismaUserRepository } from '@/repositories/prisma/user-repository';
import { PasswordRecoveryRedirect } from '@/use-cases/email/password-recovery-redirect';

export function makePasswordRecoveryRedirect() {
  const userRepository = new PrismaUserRepository();
  const passwordRecoveryRedirectCase = new PasswordRecoveryRedirect(
    userRepository,
  );

  return passwordRecoveryRedirectCase;
}
