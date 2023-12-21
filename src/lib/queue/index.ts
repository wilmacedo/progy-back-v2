import { env } from '@/env';
import { Logger } from '@/logger';
import { makeValidateActivity } from '@/use-cases/factories/jobs/make-validate-activity';
import { default as BullQueue } from 'bull';
import { schedule } from 'node-cron';
import { JobNotFoundError } from './errors/job-not-founded-error';
import { JobType } from './types';

const jobs = [makeValidateActivity];

function buildQueue(key: string) {
  const queue = new BullQueue(key, {
    redis: {
      host: env.REDIS_HOST,
      port: Number(env.REDIS_PORT),
    },
  });

  queue.on('failed', (_, err) => {
    Logger.error(`queue:${queue.name}`, err);
  });

  queue.on('completed', () => {
    Logger.log(`queue:${queue.name}`, 'completed');
  });

  return queue;
}

function getQueues() {
  return jobs.map(job => ({
    bull: buildQueue(job().name),
    instance: job,
  }));
}

async function add<T>(name: JobType, data?: T) {
  const queue = getQueues().find(queue => queue.bull.name === name);
  if (!queue) {
    throw new JobNotFoundError();
  }

  return queue.bull.add(data);
}

function process() {
  for (const queue of getQueues()) {
    queue.bull.process(() => queue.instance().execute());
  }
}

function cron() {
  for (const queue of getQueues()) {
    const instance = queue.instance();
    if (instance.cronTime !== undefined) {
      schedule(instance.cronTime, () => {
        add(instance.name);
      });
    }
  }
}

export const Queue = {
  add,
  process,
  cron,
};
