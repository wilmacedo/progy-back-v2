import { Queue } from 'bull';

export enum JobType {
  SEND_INVITE = 'send-invite',
}

export interface JobQueue<T> {
  bull: Queue<T>;
  name: JobType;
  handle: (data: T) => Promise<void>;
}
