import { prisma } from '@/lib/prisma';
import { Institution, Prisma } from '@prisma/client';
import { InstitutionRepository } from '../institution-repository';

export class PrismaInstitutionRepository implements InstitutionRepository {
  async list(options?: Prisma.InstitutionFindManyArgs): Promise<Institution[]> {
    const institutions = await prisma.institution.findMany(options);

    return institutions;
  }
}
