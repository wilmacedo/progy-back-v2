import { PrismaActivityRepository } from '@/repositories/prisma/activity-repository';
import { List } from '@/use-cases/activity/list';

export function makeList() {
  const activityRepository = new PrismaActivityRepository();
  const listCase = new List(activityRepository);

  return listCase;
}
