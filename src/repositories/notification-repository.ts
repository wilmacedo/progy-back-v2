import { Notification, Prisma } from '@prisma/client';

export interface NotificationRepository {
  create(userId: number): Promise<Notification>;
  findByUser(userId: number): Promise<Notification | null>;
  update(
    userId: number,
    data: Prisma.NotificationUpdateInput,
  ): Promise<Notification>;
}
