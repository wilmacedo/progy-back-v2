import { env } from '@/env';
import { Mailer } from '@/lib/mailer';
import { Job, JobType } from '@/lib/queue/types';
import { Logger } from '@/logger';
import { ActivityNotificationRepository } from '@/repositories/activity-notification';
import { ActivityRepository } from '@/repositories/activity-repository';
import { UserRepository } from '@/repositories/user-repository';
import { Activity, User } from '@prisma/client';
import { format } from 'date-fns';

export class ValidateActivity implements Job {
  name: JobType;
  cronTime: string;
  delayedTime: number;

  constructor(
    private activityRepository: ActivityRepository,
    private userRepository: UserRepository,
    private activityNotificationRepository: ActivityNotificationRepository,
  ) {
    this.name = JobType.VALIDATE_ACTIVITY;
    this.cronTime = '0 8 * * *'; // Every day at 8h
    this.delayedTime = 3 * 24 * 60 * 60 * 1000; // 3 days
  }

  delayedMailOptions(user: User, activity: Activity) {
    const expirationDate = format(activity.date_end, 'dd/MM');

    return {
      to: { name: user.name, email: user.email },
      subject: 'Atividade próxima da data final',
      title: 'Atividade próxima a expirar',
      description: `A atividade <strong style="color: #2e2e2e">${activity.name}</strong> está próxima da sua data limite <strong style="color: #2e2e2e">${expirationDate}. Acesse agora para ver mais detalhes.`,
      button: 'acessar atividade',
      link:
        env.DASHBOARD_URL +
        '/' +
        activity.planning_id +
        '/activities/' +
        activity.id,
    };
  }

  expiredMailOptions(user: User, activity: Activity) {
    const expirationDate = format(activity.date_end, 'dd/MM/yyyy');

    return {
      to: { name: user.name, email: user.email },
      subject: 'Atividade atrasada',
      title: 'Uma atividade expirou',
      description: `A atividade <strong style="color: #2e2e2e">${activity.name}</strong> expirou, sua data de termino era <strong style="color: #2e2e2e">${expirationDate}</strong>. Acesse agora para ver mais detalhes.`,
      button: 'acessar atividade',
      link:
        env.DASHBOARD_URL +
        '/' +
        activity.planning_id +
        '/activities/' +
        activity.id,
    };
  }

  async execute(): Promise<void> {
    const startupDate = new Date(2023, 11, 25);

    if (new Date().getTime() > startupDate.getTime()) {
      return;
    }

    const activities = await this.activityRepository.list({
      select: {
        date_end: true,
        name: true,
        planning_id: true,
        id: true,
        responsible: true,
        plannings: {
          select: {
            institutions: {
              select: {
                active: true,
              },
            },
          },
        },
      },
    });
    const currentDate = new Date();
    for (const activity of activities) {
      const hasActive = (activity as any).plannings.institutions.active;
      if (!hasActive) {
        continue;
      }

      const expirationTime = activity.date_end.getTime();
      if (
        currentDate.getTime() < expirationTime &&
        currentDate.getTime() - this.delayedTime < expirationTime
      ) {
        continue;
      }

      const user = await this.userRepository.findByName(activity.responsible);
      if (!user) {
        Logger.error(
          'queue:' + this.name,
          'Cannot find user by name: ' + activity.responsible,
        );
        continue;
      }

      let activityNotification =
        await this.activityNotificationRepository.findByActivityId(activity.id);
      if (!activityNotification) {
        activityNotification = await this.activityNotificationRepository.create(
          {
            activity: {
              connect: {
                id: activity.id,
              },
            },
          },
        );
      }
      if (activityNotification.expired) {
        continue;
      }

      const mailer = new Mailer();

      const isDelayed =
        currentDate.getTime() + this.delayedTime >= expirationTime &&
        currentDate.getTime() < expirationTime;

      const options = isDelayed
        ? this.delayedMailOptions(user, activity)
        : this.expiredMailOptions(user, activity);

      try {
        await this.activityNotificationRepository.update(activity.id, {
          delayed: isDelayed,
          expired: !isDelayed,
        });
      } catch (error) {
        Logger.error(
          'queue:' + this.name,
          'activity repository update error: ' + error,
        );
      }

      await mailer.sendMail(options);
    }
  }
}
