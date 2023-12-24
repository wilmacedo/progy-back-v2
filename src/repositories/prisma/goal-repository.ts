import { prisma } from '@/lib/prisma';
import { Goal, Prisma } from '@prisma/client';
import { GoalRepository } from '../goal-repository';

export class PrismaGoalRepository implements GoalRepository {
  async list(options?: Prisma.GoalFindManyArgs): Promise<Goal[]> {
    const goals = await prisma.goal.findMany(options);

    return goals;
  }

  async count(options?: Prisma.GoalCountArgs): Promise<number> {
    const count = prisma.goal.count(options);

    return count;
  }
}
