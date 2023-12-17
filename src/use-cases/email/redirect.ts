import { env } from '@/env';
import { UserRepository } from '@/repositories/user-repository';
import { Cryptograph } from '@/utils/cryptograph';
import { GenerateTokenError } from '../error/generate-token-error';
import { InvalidTokenError } from '../error/invalid-token-error';

interface Request {
  token: string;
}

interface Response {
  url: string;
}

interface InviteToken {
  email: string;
  institution_id: number;
  role_id: number;
  expiration: number;
  token: string;
}

export class Redirect {
  constructor(private userRepository: UserRepository) {}

  async execute({ token }: Request): Promise<Response> {
    const crypto = new Cryptograph();

    const decryptedData = crypto.decrypted(token);
    if (!decryptedData) {
      throw new InvalidTokenError();
    }

    const data: InviteToken = JSON.parse(decryptedData);
    if (!data) {
      throw new InvalidTokenError();
    }

    data.token = token;

    const userAlreadyExists = await this.userRepository.findByEmail(data.email);
    if (userAlreadyExists) {
      return { url: env.DASHBOARD_URL + '/auth/login' };
    }

    const clientToken = btoa(JSON.stringify(data));
    if (!clientToken || clientToken.length === 0) {
      throw new GenerateTokenError();
    }

    return { url: env.DASHBOARD_URL + '/auth/invite?token=' + clientToken };
  }
}
