import { PrismaFontRepository } from '@/repositories/prisma/font-repository';
import { List } from '@/use-cases/font/list';

export function makeList() {
  const fontRepository = new PrismaFontRepository();
  const listCase = new List(fontRepository);

  return listCase;
}
