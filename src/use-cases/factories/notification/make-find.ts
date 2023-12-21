import { PrismaNotificationRepository } from '@/repositories/prisma/notification-repository';
import { PrismaUserRepository } from '@/repositories/prisma/user-repository';
import { Find } from '@/use-cases/notification/find';

export function makeFind() {
  const notificationRepository = new PrismaNotificationRepository();
  const userRepository = new PrismaUserRepository();
  const findCase = new Find(notificationRepository, userRepository);

  return findCase;
}
