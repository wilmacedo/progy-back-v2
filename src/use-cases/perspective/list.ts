import { PerspectiveRepository } from '@/repositories/perspective-repository';
import { Filter, getPopulate } from '@/utils/filter-manager';
import { Perspective, Prisma } from '@prisma/client';

interface Request {
  planningId: number;
  filter?: Filter;
}

interface Response {
  perspectives: Perspective[];
}

export class List {
  constructor(private perspectiveRepository: PerspectiveRepository) {}

  async execute({ planningId, filter }: Request): Promise<Response> {
    const options: Prisma.PerspectiveFindManyArgs = {
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

    const perspectives = await this.perspectiveRepository.list(options);

    return { perspectives };
  }
}
