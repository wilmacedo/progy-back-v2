import { Prisma } from '@prisma/client';

export interface GoalRepository {
  count(options?: Prisma.GoalCountArgs): Promise<number>;
}
