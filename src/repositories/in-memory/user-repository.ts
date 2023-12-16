import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../user-repository';

export class InMemoryUserRepository implements UserRepository {
  users: User[] = [];

  async findById(id: number): Promise<User | null> {
    const user = this.users.find(user => user.id === id);

    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);

    return user || null;
  }

  async create({
    name,
    email,
    password,
    role,
    created_at,
    updated_at,
  }: Prisma.UserCreateInput): Promise<User> {
    let id = 1;
    if (this.users.length > 0) {
      id = this.users[this.users.length - 1].id + 1;
    }

    const user: User = {
      id,
      name,
      email,
      password,
      role,
      created_at: typeof created_at !== 'string' ? created_at : new Date(),
      updated_at: typeof updated_at !== 'string' ? updated_at : new Date(),
      institution_id: null,
      unit_id: null,
    };

    this.users.push(user);

    return user;
  }
}
