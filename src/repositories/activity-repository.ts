import { Activity, Prisma } from '@prisma/client';

export interface ActivityRepository {
  findById(
    id: number,
    options?: Prisma.ActivityFindManyArgs,
  ): Promise<Activity | null>;
  list(options?: Prisma.ActivityFindManyArgs): Promise<Activity[]>;
}
