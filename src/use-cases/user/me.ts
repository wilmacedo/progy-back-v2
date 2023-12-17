import { UserRepository } from '@/repositories/user-repository';
import { AccessTokenData } from '@/types/access-token';
import { User } from '@prisma/client';
import { UserNotFoundError } from '../error/user-not-found-error';

interface Request {
  userData: AccessTokenData;
}

interface Response {
  user: User;
}

export class Me {
  constructor(private userRepository: UserRepository) {}

  async execute({ userData }: Request): Promise<Response> {
    const { user: data } = userData;

    const user = await this.userRepository.findById(data.id);
    if (!user) {
      throw new UserNotFoundError();
    }

    return { user };
  }
}
