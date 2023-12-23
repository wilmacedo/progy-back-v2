import { StageRepository } from '@/repositories/stage-repository';
import { Filter, getPopulate } from '@/utils/filter-manager';
import { Prisma, Stage } from '@prisma/client';

interface Request {
  planningId: number;
  filter?: Filter;
}

interface Response {
  stages: Stage[];
}

export class List {
  constructor(private stageRepository: StageRepository) {}

  async execute({ planningId, filter }: Request): Promise<Response> {
    const options: Prisma.StageFindManyArgs = {
      where: {
        planning_id: planningId,
      },
      select: {
        id: true,
        name: true,
      },
    };

    const populate = getPopulate(filter);
    if (populate !== null) {
      options.select = {
        ...options.select,
        ...populate.select,
      };
    }

    const stages = await this.stageRepository.list(options);

    return { stages };
  }
}
