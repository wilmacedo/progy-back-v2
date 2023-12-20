import { env } from '@/env';
import { Logger } from '@/logger';
import { makeValidateActivity } from '@/use-cases/factories/jobs/make-validate-activity';
import { default as BullQueue } from 'bull';
import { JobType } from './types';

const jobs = [makeValidateActivity];

const queues = jobs.map(job => ({
  bull: new BullQueue(job().name, {
    redis: {
      host: env.REDIS_HOST,
      port: Number(env.REDIS_PORT),
    },
  }),
  instance: job,
}));

async function add(name: JobType, data?: any) {
  const queue = queues.find(queue => queue.bull.name === name);
  if (!queue) {
    throw new Error('Job not founded');
  }

  return queue.bull.add(data);
}

function process() {
  for (const queue of queues) {
    queue.bull.process(() => queue.instance().execute());

    queue.bull.on('failed', (_, err) => {
      Logger.error(`queue:${queue.bull.name}`, err);
    });

    queue.bull.on('completed', () => {
      Logger.log(`queue:${queue.bull.name}`, 'completed');
    });
  }
}

export const Queue = {
  add,
  process,
};
