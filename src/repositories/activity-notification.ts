import { ActivityNotification, Prisma } from '@prisma/client';

export interface ActivityNotificationRepository {
  create(
    data: Prisma.ActivityNotificationCreateInput,
  ): Promise<ActivityNotification>;
  findByActivityId(activityId: number): Promise<ActivityNotification | null>;
  update(
    activityId: number,
    data: Prisma.ActivityNotificationUpdateInput,
  ): Promise<ActivityNotification>;
}
