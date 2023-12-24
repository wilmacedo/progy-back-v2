import { FontRepository } from '@/repositories/font-repository';
import { Filter, getPopulate } from '@/utils/filter-manager';
import { Font, Prisma } from '@prisma/client';

interface Request {
  planningId: number;
  filter?: Filter;
}

interface Response {
  fonts: Font[];
}

export class List {
  constructor(private fontRepository: FontRepository) {}

  async execute({ planningId, filter }: Request): Promise<Response> {
    const options: Prisma.FontFindManyArgs = {
      where: {
        planning_id: planningId,
      },
      select: {
        id: true,
        name: true,
        code: true,
        date: true,
        value: true,
        other_value: true,
      },
    };

    const populate = getPopulate(filter);
    if (populate !== null) {
      options.select = {
        ...options.select,
        ...populate.select,
      };
    }

    const fonts = await this.fontRepository.list(options);

    return { fonts };
  }
}
