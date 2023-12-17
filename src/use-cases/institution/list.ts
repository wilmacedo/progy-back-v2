import { InstitutionRepository } from '@/repositories/institution-repository';
import { Filter, getPopulate } from '@/utils/filter-manager';
import { Institution, Prisma } from '@prisma/client';

interface Request {
  filter: Filter;
}

interface Response {
  institutions: Institution[];
}

export class List {
  constructor(private institutionRepository: InstitutionRepository) {}

  async execute({ filter }: Request): Promise<Response> {
    const options: Prisma.InstitutionFindManyArgs = {
      select: {
        id: true,
        name: true,
        code: true,
      },
    };

    const populate = getPopulate(filter);
    if (populate !== null) {
      options.select = {
        ...options.select,
        ...populate.select,
      };
    }

    const institutions = await this.institutionRepository.list(options);

    return { institutions };
  }
}
