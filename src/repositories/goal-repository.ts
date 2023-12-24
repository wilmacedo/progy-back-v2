import { Goal, Prisma } from '@prisma/client';

export interface GoalRepository {
  list(options?: Prisma.GoalFindManyArgs): Promise<Goal[]>;
  count(options?: Prisma.GoalCountArgs): Promise<number>;
}
