import { PrismaInstitutionRepository } from '@/repositories/prisma/institution-repository';
import { PrismaUserRepository } from '@/repositories/prisma/user-repository';
import { SendInvite } from '@/use-cases/user/send-invite';

export function makeSendInvite() {
  const userRepository = new PrismaUserRepository();
  const institutionRepository = new PrismaInstitutionRepository();
  const sendInviteCase = new SendInvite(userRepository, institutionRepository);

  return sendInviteCase;
}
