import { Font, Prisma } from '@prisma/client';

export interface FontRepository {
  list(options?: Prisma.FontFindManyArgs): Promise<Font[]>;
}
