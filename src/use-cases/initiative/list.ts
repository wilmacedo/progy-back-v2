import { InitiativeRepository } from '@/repositories/initiative-repository';
import { Filter, getPopulate } from '@/utils/filter-manager';
import { Initiative, Prisma } from '@prisma/client';

interface ListRequest {
  planningId: number;
  filter?: Filter;
}

interface ListResponse {
  initiatives: Initiative[];
}

export class List {
  constructor(private initiativeRepository: InitiativeRepository) {}

  async execute({ planningId, filter }: ListRequest): Promise<ListResponse> {
    const options: Prisma.InitiativeFindManyArgs = {
      where: {
        planning_id: planningId,
      },
      select: {
        id: true,
        name: true,
        code: true,
        responsible: true,
        planning_id: true,
        unit_id: true,
        perspective_id: true,
        stage_id: true,
        font_id: true,
        goal_id: true,
        comments: true,
        created_at: true,
        updated_at: true,
      },
    };

    const populate = getPopulate(filter);
    if (populate !== null) {
      options.select = {
        ...options.select,
        ...populate.select,
      };
    }

    const initiatives = await this.initiativeRepository.list(options);

    return { initiatives };
  }
}
