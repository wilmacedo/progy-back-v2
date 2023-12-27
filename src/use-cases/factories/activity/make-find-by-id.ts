import { PrismaActivityRepository } from '@/repositories/prisma/activity-repository';
import { FindActivityCase } from '@/use-cases/activity/find';

export function makeFindById() {
  const activityRepository = new PrismaActivityRepository();
  const findByIdCase = new FindActivityCase(activityRepository);

  return findByIdCase;
}
