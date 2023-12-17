import { UserRepository } from '@/repositories/user-repository';
import { User } from '@prisma/client';
import { UserNotFoundError } from '../error/user-not-found-error';

interface Request {
  id: number;
  name?: string;
  email?: string;
  role?: string;
}

interface Response {
  user: User;
}

export class Update {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, ...data }: Request): Promise<Response> {
    const userExists = await this.userRepository.findById(id);
    if (!userExists) {
      throw new UserNotFoundError();
    }

    const updatedUser = await this.userRepository.update(id, data);

    return { user: updatedUser };
  }
}
