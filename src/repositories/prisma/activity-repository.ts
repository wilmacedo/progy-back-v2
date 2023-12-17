import { prisma } from '@/lib/prisma';
import { Activity, Prisma } from '@prisma/client';
import { ActivityRepository } from '../activity-repository';

export class PrismaActivityRepository implements ActivityRepository {
  async list(options?: Prisma.ActivityFindManyArgs): Promise<Activity[]> {
    const activities = await prisma.activity.findMany(options);

    return activities;
  }
}
