import { InMemoryUserRepository } from '@/repositories/in-memory/user-repository';
import { AccessTokenData } from '@/types/access-token';
import { hash } from 'bcrypt';
import { beforeEach, describe, expect, it } from 'vitest';
import { UserNotFoundError } from '../error/user-not-found-error';
import { Me } from './me';

let userRepository: InMemoryUserRepository;
let sut: Me;

describe('Get user information case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    sut = new Me(userRepository);

    await userRepository.create({
      name: 'Wil Macedo',
      email: 'wil.macedo.sa@gmail.com',
      role: 'admin',
      password: await hash('123456', 6),
      created_at: new Date(),
      updated_at: new Date(),
    });
  });

  it('should be able to retrieve user information', async () => {
    const userData = { user: { id: 1 } } as AccessTokenData;
    const { user } = await sut.execute({
      userData,
    });

    expect(user.id).toBe(1);
  });

  it('should be not able to retrieve user information with wrong id', async () => {
    const userData = { user: { id: 0 } } as AccessTokenData;
    expect(sut.execute({ userData })).rejects.toThrow(UserNotFoundError);
  });
});
