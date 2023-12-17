import { prisma } from '@/lib/prisma';
import { Prisma, Stage } from '@prisma/client';
import { StageRepository } from '../stage-repository';

export class PrismaStageRepository implements StageRepository {
  async list(options?: Prisma.StageFindManyArgs): Promise<Stage[]> {
    const stages = await prisma.stage.findMany(options);

    return stages;
  }
}
