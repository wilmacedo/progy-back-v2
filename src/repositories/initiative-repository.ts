import { Initiative, Prisma } from '@prisma/client';

export interface InitiativeRepository {
  list(options?: Prisma.InitiativeFindManyArgs): Promise<Initiative[]>;
}
