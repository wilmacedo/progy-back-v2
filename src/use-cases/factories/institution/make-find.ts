import { PrismaInstitutionRepository } from '@/repositories/prisma/institution-repository';
import { Find } from '@/use-cases/institution/find';

export function makeFindCase() {
  const institutionRepository = new PrismaInstitutionRepository();
  const findCase = new Find(institutionRepository);

  return findCase;
}
