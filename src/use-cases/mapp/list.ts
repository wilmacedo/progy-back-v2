import { MappRepository } from '@/repositories/mapp-repository';
import { Filter, getPopulate } from '@/utils/filter-manager';
import { Mapp, Prisma } from '@prisma/client';

interface Request {
  planningId: number;
  filter?: Filter;
}

interface Response {
  mapps: Mapp[];
}

export class List {
  constructor(private mappRepository: MappRepository) {}

  async execute({ planningId, filter }: Request): Promise<Response> {
    const options: Prisma.MappFindManyArgs = {
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

    const mapps = await this.mappRepository.list(options);

    return { mapps };
  }
}
