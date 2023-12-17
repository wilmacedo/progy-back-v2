import { env } from '@/env';
import Queue from 'bull';
import { JobQueue, JobType } from './types';

interface Config {
  redis: {
    host: string;
    port: number;
  };
}

export default abstract class Job<T> {
  key: JobType;
  config: Config;

  constructor(key: JobType) {
    this.key = key;
    this.config = {
      redis: {
        host: env.REDIS_HOST,
        port: Number(env.REDIS_PORT),
      },
    };
  }

  abstract handle(data: T): Promise<void>;

  buildQueue(): JobQueue<T> {
    return {
      bull: new Queue<T>(this.key, this.config),
      name: this.key,
      handle: this.handle,
    };
  }
}
