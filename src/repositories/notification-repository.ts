import { Notification } from '@prisma/client';

export interface NotificationRepository {
  create(userId: number): Promise<Notification>;
  findByUser(userId: number): Promise<Notification | null>;
}
