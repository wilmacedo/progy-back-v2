import { UserRepository } from '@/repositories/user-repository';
import { User } from '@prisma/client';

interface Request {
  planningId: number;
}

interface Response {
  users: User[];
}

export class UserListCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ planningId }: Request): Promise<Response> {
    const users = await this.userRepository.list({
      where: {
        OR: [
          {
            role: 'admin',
          },
          {
            institutions: {
              plannings: {
                some: {
                  id: planningId,
                },
              },
            },
          },
        ],
      },
      select: {
        name: true,
        email: true,
        id: true,
        role: true,
      },
    });

    return { users };
  }
}
