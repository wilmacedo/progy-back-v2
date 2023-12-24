import { prisma } from '@/lib/prisma';
import { Font, Prisma } from '@prisma/client';
import { FontRepository } from '../font-repository';

export class PrismaFontRepository implements FontRepository {
  async list(options?: Prisma.FontFindManyArgs): Promise<Font[]> {
    const fonts = await prisma.font.findMany(options);

    return fonts;
  }
}
