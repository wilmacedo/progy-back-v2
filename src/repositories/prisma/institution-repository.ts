import { prisma } from '@/lib/prisma';
import { Institution, Prisma } from '@prisma/client';
import { InstitutionRepository } from '../institution-repository';

export class PrismaInstitutionRepository implements InstitutionRepository {
  async findById(id: number): Promise<Institution | null> {
    const institution = await prisma.institution.findUnique({ where: { id } });

    return institution;
  }
  async list(options?: Prisma.InstitutionFindManyArgs): Promise<Institution[]> {
    const institutions = await prisma.institution.findMany(options);

    return institutions;
  }
}
