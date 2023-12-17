import { UserRepository } from '@/repositories/user-repository';
import { Filter, getPopulate } from '@/utils/filter-manager';
import { Prisma, User } from '@prisma/client';

interface Request {
  filter: Filter;
}

interface Response {
  users: User[];
}

export class List {
  constructor(private userRepository: UserRepository) {}

  async execute({ filter }: Request): Promise<Response> {
    // TODO: Fix select for institution nested
    const options: Prisma.UserFindManyArgs = {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        institution_id: true,
        unit_id: true,
      },
    };

    const populate = getPopulate(filter);
    if (populate !== null) {
      options.select = {
        ...options.select,
        ...populate.select,
      };
    }

    const users = await this.userRepository.list(options);

    return { users };
  }
}
