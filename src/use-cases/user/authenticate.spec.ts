import { InMemoryUserRepository } from '@/repositories/in-memory/user-repository';
import { hash } from 'bcrypt';
import { beforeEach, describe, expect, it } from 'vitest';
import { InvalidCredentialsError } from '../error/invalid-credentials-error';
import { AuthenticateUseCase } from './authenticate';

let userRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

describe('Register user case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new AuthenticateUseCase(userRepository);
  });

  it('should be able to authenticate', async () => {
    await userRepository.create({
      email: 'wil.macedo.sa@gmail.com',
      name: 'Wil Macedo',
      password: await hash('123456', 6),
      role: 'user',
      created_at: new Date(),
      updated_at: new Date(),
    });

    const { user } = await sut.execute({
      email: 'wil.macedo.sa@gmail.com',
      password: '123456',
    });

    expect(user.email).toEqual('wil.macedo.sa@gmail.com');
  });

  it('should be not able to authenticate with wrong email', async () => {
    await userRepository.create({
      email: 'wil.macedo.sa@gmail.com',
      name: 'Wil Macedo',
      password: await hash('123456', 6),
      role: 'user',
      created_at: new Date(),
      updated_at: new Date(),
    });

    expect(
      sut.execute({
        email: 'wil@gmail.com',
        password: '123456',
      }),
    ).rejects.toThrow(InvalidCredentialsError);
  });

  it('should be not able to authenticate with wrong password', async () => {
    await userRepository.create({
      email: 'wil.macedo.sa@gmail.com',
      name: 'Wil Macedo',
      password: await hash('123456', 6),
      role: 'user',
      created_at: new Date(),
      updated_at: new Date(),
    });

    expect(
      sut.execute({
        email: 'wil.macedo.sa@gmail.com',
        password: '12345',
      }),
    ).rejects.toThrow(InvalidCredentialsError);
  });
});
