import { prisma } from '@/lib/prisma';
import { Prisma, State } from '@prisma/client';
import { StateRepository } from '../state-repository';

export class PrismaStateRepository implements StateRepository {
  async list(options?: Prisma.StateFindManyArgs): Promise<State[]> {
    const states = await prisma.state.findMany(options);

    return states;
  }
}
