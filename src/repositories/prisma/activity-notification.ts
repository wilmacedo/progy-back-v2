import { prisma } from '@/lib/prisma';
import { ActivityNotification, Prisma } from '@prisma/client';
import { ActivityNotificationRepository } from '../activity-notification';

export class PrismaActivityNotification
  implements ActivityNotificationRepository
{
  async create(
    data: Prisma.ActivityNotificationCreateInput,
  ): Promise<ActivityNotification> {
    const activityNotification = await prisma.activityNotification.create({
      data,
    });

    return activityNotification;
  }

  async findByActivityId(
    activityId: number,
  ): Promise<ActivityNotification | null> {
    const activityNotification = await prisma.activityNotification.findUnique({
      where: {
        activity_id: activityId,
      },
    });

    return activityNotification;
  }

  async update(
    activityId: number,
    data: Prisma.ActivityNotificationUpdateInput,
  ): Promise<ActivityNotification> {
    const activityNotification = await prisma.activityNotification.update({
      where: { activity_id: activityId },
      data,
    });

    return activityNotification;
  }
}
