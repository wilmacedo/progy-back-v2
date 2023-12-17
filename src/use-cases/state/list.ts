import { StateRepository } from '@/repositories/state-repository';
import { Filter, getPopulate } from '@/utils/filter-manager';
import { Prisma, State } from '@prisma/client';

interface ListRequest {
  planningId: number;
  filter?: Filter;
}

interface ListResponse {
  states: State[];
}

export class List {
  constructor(private stateRepository: StateRepository) {}

  async execute({ planningId, filter }: ListRequest): Promise<ListResponse> {
    const options: Prisma.StateFindManyArgs = {
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

    const states = await this.stateRepository.list(options);

    return { states };
  }
}
