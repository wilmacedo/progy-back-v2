import { Perspective, Prisma } from '@prisma/client';

export interface PerspectiveRepository {
  list(options?: Prisma.PerspectiveFindManyArgs): Promise<Perspective[]>;
}
