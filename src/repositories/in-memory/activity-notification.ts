import { ActivityNotFoundError } from '@/use-cases/error/activity-not-found-error';
import { ActivityNotification, Prisma } from '@prisma/client';
import { ActivityNotificationRepository } from '../activity-notification';

export class InMemoryActivityNotificationRepository
  implements ActivityNotificationRepository
{
  activityNotifications: ActivityNotification[] = [];

  async create({
    activity,
    delayed,
    expired,
  }: Prisma.ActivityNotificationCreateInput): Promise<ActivityNotification> {
    let id = 1;
    if (this.activityNotifications.length > 0) {
      id =
        this.activityNotifications[this.activityNotifications.length - 1].id +
        1;
    }

    const activityNotification: ActivityNotification = {
      id,
      delayed: delayed || false,
      expired: expired || false,
      activity_id: activity?.connect?.id || 0,
    };

    this.activityNotifications.push(activityNotification);

    return activityNotification;
  }

  async findByActivityId(
    activityId: number,
  ): Promise<ActivityNotification | null> {
    const activityNotification = this.activityNotifications.find(
      not => not.activity_id === activityId,
    );

    return activityNotification || null;
  }

  async update(
    activityId: number,
    data: Prisma.ActivityNotificationUpdateInput,
  ): Promise<ActivityNotification> {
    let updatedActivityNotification: ActivityNotification | null = null;

    this.activityNotifications = this.activityNotifications.map(
      activityNotification => {
        if (activityNotification.activity_id !== activityId) {
          return activityNotification;
        }

        updatedActivityNotification = {
          id: activityNotification.id,
          activity_id: activityId,
          delayed: data.delayed
            ? Boolean(data.delayed)
            : activityNotification.delayed,
          expired: data.expired
            ? Boolean(data.expired)
            : activityNotification.expired,
        };

        return updatedActivityNotification;
      },
    );

    if (updatedActivityNotification === null) {
      throw new ActivityNotFoundError();
    }

    return updatedActivityNotification;
  }
}
