import { Institution, Prisma } from '@prisma/client';

export interface InstitutionRepository {
  list(options?: Prisma.InstitutionFindManyArgs): Promise<Institution[]>;
}
