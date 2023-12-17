import { Prisma, Stage } from '@prisma/client';

export interface StageRepository {
  list(options?: Prisma.StageFindManyArgs): Promise<Stage[]>;
}
