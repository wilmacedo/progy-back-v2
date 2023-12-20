import { Queue } from '@/lib/queue';
import { JobType } from '@/lib/queue/types';
import { InstitutionRepository } from '@/repositories/institution-repository';
import { UserRepository } from '@/repositories/user-repository';
import { InstitutionNotFoundError } from '../error/institution-not-found-error';
import { UserAlreadyExists } from '../error/user-already-exists-error';

interface Request {
  email: string;
  institution_id: number;
  role: string;
}

export class SendInvite {
  constructor(
    private userRepository: UserRepository,
    private institutionRepository: InstitutionRepository,
  ) {}

  async execute({ email, institution_id, role }: Request): Promise<void> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExists();
    }

    const institutionHasExists =
      await this.institutionRepository.findById(institution_id);
    if (!institutionHasExists) {
      throw new InstitutionNotFoundError();
    }

    Queue.add(JobType.SEND_INVITE, { email, institution_id, role });
  }
}
