import { Queue } from '@/lib/queue';
import { JobType } from '@/lib/queue/types';
import { UserRepository } from '@/repositories/user-repository';
import { UserNotFoundError } from '../error/user-not-found-error';

interface Request {
  email: string;
}

export class RecoveryPassword {
  constructor(private userRepository: UserRepository) {}

  async execute({ email }: Request): Promise<void> {
    const userExists = await this.userRepository.findByEmail(email);
    if (!userExists) {
      throw new UserNotFoundError();
    }

    Queue.add(JobType.RECOVERY_PASSWORD, { email });
  }
}
