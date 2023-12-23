import { prisma } from '@/lib/prisma';
import { Perspective, Prisma } from '@prisma/client';
import { PerspectiveRepository } from '../perspective-repository';

export class PrismaPerspectiveRepository implements PerspectiveRepository {
  async list(options?: Prisma.PerspectiveFindManyArgs): Promise<Perspective[]> {
    const perspectives = await prisma.perspective.findMany(options);

    return perspectives;
  }
}
