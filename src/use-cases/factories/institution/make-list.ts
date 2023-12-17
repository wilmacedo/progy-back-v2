import { PrismaInstitutionRepository } from '@/repositories/prisma/institution-repository';
import { List } from '@/use-cases/institution/list';

export function makeList() {
  const institutionRepository = new PrismaInstitutionRepository();
  const listCase = new List(institutionRepository);

  return listCase;
}
