import { Mapp, Prisma } from '@prisma/client';

export interface MappRepository {
  list(options?: Prisma.MappFindManyArgs): Promise<Mapp[]>;
}
