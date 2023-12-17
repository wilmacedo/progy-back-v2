import { Institution, Prisma } from '@prisma/client';

export interface InstitutionRepository {
  findById(id: number): Promise<Institution | null>;
  list(options?: Prisma.InstitutionFindManyArgs): Promise<Institution[]>;
}
