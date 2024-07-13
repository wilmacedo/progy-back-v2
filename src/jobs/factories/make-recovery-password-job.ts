import { PrismaUserRepository } from '@/repositories/prisma/user-repository';
import { RecoveryPasswordJob } from '../handlers/recovery-password';

export function makeRecoveryPasswordJob() {
  const userRepository = new PrismaUserRepository();
  const recoveryPasswordJob = new RecoveryPasswordJob(userRepository);

  return recoveryPasswordJob;
}
