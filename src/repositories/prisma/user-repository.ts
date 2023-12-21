import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../user-repository';

export class PrismaUserRepository implements UserRepository {
  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findByName(name: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });

    return user;
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return user;
  }

  async list(options?: Prisma.UserFindManyArgs): Promise<User[]> {
    const users = await prisma.user.findMany(options);

    return users;
  }
}
