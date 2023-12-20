import { env } from '@/env';
import { Mailer } from '@/lib/mailer';
import { Job, JobType } from '@/lib/queue/types';
import { Logger } from '@/logger';
import { ActivityRepository } from '@/repositories/activity-repository';
import { Activity } from '@prisma/client';
import { format } from 'date-fns';

interface SendDelayedData {
  name: string;
  email: string;
  activity: Activity;
}

export class ValidateActivity implements Job {
  name: JobType;
  cronTime: string;
  delayedTime: number;
  sended: boolean;

  constructor(private activityRepository: ActivityRepository) {
    this.name = JobType.VALIDATE_ACTIVITY;
    this.cronTime = '* * * * * *';
    this.delayedTime = 3 * 24 * 60 * 60 * 1000; // 3 days
    this.sended = false;
  }

  async sendDelayed({ name, email, activity }: SendDelayedData) {
    const mailer = new Mailer();
    const expirationDate = format(activity.date_end, 'dd/MM');

    await mailer.sendMail({
      to: { name, email },
      subject: 'Atividade próxima da data final',
      title: 'Atividade próxima a expirar',
      description: `A atividade ${activity.name} está próxima da sua data limite (${expirationDate}), acesse agora para ver mais detalhes.`,
      button: 'acessar atividade',
      link:
        env.DASHBOARD_URL +
        '/' +
        activity.planning_id +
        '/activities/' +
        activity.id,
    });
  }

  async execute(): Promise<void> {
    Logger.log(this.name, 'executing...');
    if (this.sended) return;

    Logger.log(this.name, 'started...');

    const activities = await this.activityRepository.list();
    const currentDate = new Date();

    for (const activity of activities) {
      const expirationTime = activity.date_end.getTime();

      if (currentDate.getTime() > expirationTime) {
        // TODO: Tarefa atrasada
      } else if (currentDate.getTime() + this.delayedTime >= expirationTime) {
        const data: SendDelayedData = {
          name: 'Jana Sousa',
          email: 'jana@gmail.com',
          activity,
        };
      }
    }

    this.sended = true;
  }
}
