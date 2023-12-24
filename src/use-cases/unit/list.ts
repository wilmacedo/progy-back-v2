import { UnitRepository } from '@/repositories/unit-repository';
import { Filter, getPopulate } from '@/utils/filter-manager';
import { Prisma, Unit } from '@prisma/client';

interface Request {
  planningId: number;
  filter?: Filter;
}

interface Response {
  units: Unit[];
}

export class List {
  constructor(private unitRepository: UnitRepository) {}

  async execute({ planningId, filter }: Request): Promise<Response> {
    const options: Prisma.UnitFindManyArgs = {
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

    const units = await this.unitRepository.list(options);

    return { units };
  }
}
