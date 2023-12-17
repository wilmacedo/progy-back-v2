import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { GoalRepository } from '../goal-repository';

export class PrismaGoalRepository implements GoalRepository {
  async count(options?: Prisma.GoalCountArgs): Promise<number> {
    const count = prisma.goal.count(options);

    return count;
  }
}
