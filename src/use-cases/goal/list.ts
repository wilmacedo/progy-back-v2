import { GoalRepository } from '@/repositories/goal-repository';
import { Filter, getPopulate } from '@/utils/filter-manager';
import { Goal, Prisma } from '@prisma/client';

interface Request {
  planningId: number;
  filter?: Filter;
}

interface Response {
  goals: Goal[];
}

export class List {
  constructor(private goalRepository: GoalRepository) {}

  async execute({ planningId, filter }: Request): Promise<Response> {
    const options: Prisma.GoalFindManyArgs = {
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

    const goals = await this.goalRepository.list(options);

    return { goals };
  }
}
