import { UserRepository } from '@/repositories/user-repository';
import { UserAlreadyExists } from '@/use-cases/error/user-already-exists-error';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  institution_id?: number;
  role: string;
}

interface RegisterUserUseCaseResponse {
  user: User;
}

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
    role,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExists();
    }

    const passwordHash = await hash(password, 6);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      role,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return { user };
  }
}
