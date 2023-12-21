import { PrismaNotificationRepository } from '@/repositories/prisma/notification-repository';
import { PrismaUserRepository } from '@/repositories/prisma/user-repository';
import { Update } from '@/use-cases/notification/update';

export function makeUpdateCase() {
  const notificationRepository = new PrismaNotificationRepository();
  const userRepository = new PrismaUserRepository();
  const updateCase = new Update(notificationRepository, userRepository);

  return updateCase;
}
