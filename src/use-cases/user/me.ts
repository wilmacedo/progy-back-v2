import { UserRepository } from '@/repositories/user-repository';
import { AccessTokenData } from '@/types/access-token';
import { UserNotFoundError } from '../error/user-not-found-error';

interface Request {
  userData: AccessTokenData;
}

interface Response {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    institution_id: number | null;
    unit_id: number | null;
  };
}

export class Me {
  constructor(private userRepository: UserRepository) {}

  async execute({ userData }: Request): Promise<Response> {
    const { user: data } = userData;

    const user = await this.userRepository.findById(data.id);
    if (!user) {
      throw new UserNotFoundError();
    }

    const { id, name, email, role, institution_id, unit_id } = user;
    const result = {
      id,
      name,
      email,
      role,
      institution_id,
      unit_id,
    };

    return { user: result };
  }
}
