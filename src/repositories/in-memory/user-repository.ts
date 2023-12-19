import { UserNotFoundError } from '@/use-cases/error/user-not-found-error';
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

  async list(): Promise<User[]> {
    return this.users;
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    let updatedUser: User | null = null;

    this.users = this.users.map(user => {
      if (user.id !== id) {
        return user;
      }

      updatedUser = {
        id,
        name: data.name ? data.name.toString() : user.name,
        email: data.email ? data.email.toString() : user.email,
        password: user.password,
        role: data.role ? data.role.toString() : user.role,
        institution_id: data.institution_id
          ? Number(data.institution_id.toString())
          : user.institution_id,
        unit_id: data.units ? Number(data.units.connect?.id) : user.unit_id,
        created_at: user.created_at,
        updated_at: new Date(),
      };

      return updatedUser;
    });

    if (updatedUser === null) {
      throw new UserNotFoundError();
    }

    return updatedUser;
  }
}
