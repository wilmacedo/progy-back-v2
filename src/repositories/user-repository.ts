import { Prisma, User } from '@prisma/client';

export interface UserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  list(options?: Prisma.UserFindManyArgs): Promise<User[]>;
}
