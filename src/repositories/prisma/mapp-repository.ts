import { prisma } from '@/lib/prisma';
import { Mapp, Prisma } from '@prisma/client';
import { MappRepository } from '../mapp-repository';

export class PrismaMappRepository implements MappRepository {
  async list(options?: Prisma.MappFindManyArgs): Promise<Mapp[]> {
    const mapps = await prisma.mapp.findMany(options);

    return mapps;
  }
}
