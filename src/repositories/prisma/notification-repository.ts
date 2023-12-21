import { prisma } from '@/lib/prisma';
import { Notification, Prisma } from '@prisma/client';
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
      where: { user_id: userId },
    });

    return notification;
  }

  async update(
    userId: number,
    data: Prisma.NotificationUpdateInput,
  ): Promise<Notification> {
    const notification = await prisma.notification.update({
      where: { user_id: userId },
      data,
    });

    return notification;
  }
}
