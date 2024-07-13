import { PrismaUserRepository } from '@/repositories/prisma/user-repository';
import { RecoveryPassword } from '@/use-cases/user/recovery-password';

export function makePasswordRecovery() {
  const userRepository = new PrismaUserRepository();
  const passwordRecovery = new RecoveryPassword(userRepository);

  return passwordRecovery;
}
