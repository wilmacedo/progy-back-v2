import { Prisma, State } from '@prisma/client';

export interface StateRepository {
  list(options?: Prisma.StateFindManyArgs): Promise<State[]>;
}
