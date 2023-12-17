import { Activity, Prisma } from '@prisma/client';

export interface ActivityRepository {
  list(options?: Prisma.ActivityFindManyArgs): Promise<Activity[]>;
}
