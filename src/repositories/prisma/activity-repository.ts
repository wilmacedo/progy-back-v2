import { prisma } from '@/lib/prisma';
import { Activity, Prisma } from '@prisma/client';
import { ActivityRepository } from '../activity-repository';

export class PrismaActivityRepository implements ActivityRepository {
  async findById(
    id: number,
    options?: Prisma.ActivityFindManyArgs,
  ): Promise<Activity | null> {
    let defaultOptions = { where: { id } };
    if (options) {
      defaultOptions = {
        ...options,
        ...defaultOptions,
      };
    }

    const activity = await prisma.activity.findUnique(defaultOptions);
    return activity;
  }

  async list(options?: Prisma.ActivityFindManyArgs): Promise<Activity[]> {
    const activities = await prisma.activity.findMany(options);

    return activities;
  }
}
