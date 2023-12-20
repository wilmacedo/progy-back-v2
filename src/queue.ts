import { Queue } from '@/lib/queue';
import { JobType } from './lib/queue/types';

Queue.add(JobType.VALIDATE_ACTIVITY);
Queue.process();
