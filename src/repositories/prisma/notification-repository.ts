import { prisma } from '@/lib/prisma';
import { Notification } from '@prisma/client';
import { NotificationRepository } from '../notification-repository';

export class PrismaNotificationRepository implements NotificationRepository {
  async create(userId: number): Promise<Notification> {
    const notification = await prisma.notification.create({
      data: {
        user_id: userId,
      },
    });

    return notification;
  }

  async findByUser(userId: number): Promise<Notification | null> {
    const notification = await prisma.notification.findUnique({
      where: { id: userId },
    });

    return notification;
  }
}
