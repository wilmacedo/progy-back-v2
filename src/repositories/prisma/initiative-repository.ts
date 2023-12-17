import { prisma } from '@/lib/prisma';
import { Initiative, Prisma } from '@prisma/client';
import { InitiativeRepository } from '../initiative-repository';

export class PrismaInitiativeRepository implements InitiativeRepository {
  async list(options?: Prisma.InitiativeFindManyArgs): Promise<Initiative[]> {
    const initiatives = await prisma.initiative.findMany(options);

    return initiatives;
  }
}
