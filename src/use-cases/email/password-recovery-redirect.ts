import { UserRepository } from '@/repositories/user-repository';
import { Cryptograph } from '@/utils/cryptograph';
import { InvalidTokenError } from '../error/invalid-token-error';
import { UserNotFoundError } from '../error/user-not-found-error';
import { GenerateTokenError } from '../error/generate-token-error';
import { env } from '@/env';

interface Request {
  token: string;
}

interface Response {
  url: string;
}

interface PasswordRecoveryToken {
  email: string;
  expiration: string;
  token: string;
}

export class PasswordRecoveryRedirect {
  constructor(private userRespository: UserRepository) {}

  async execute({ token }: Request): Promise<Response> {
    const crypto = new Cryptograph();

    const decryptedData = crypto.decrypted(token);
    if (!decryptedData) {
      throw new InvalidTokenError();
    }

    const data: PasswordRecoveryToken = JSON.parse(decryptedData);
    if (!data) {
      throw new InvalidTokenError();
    }

    data.token = token;

    const userExists = await this.userRespository.findByEmail(data.email);
    if (!userExists) {
      throw new UserNotFoundError();
    }

    const clientToken = btoa(JSON.stringify(data));
    if (!clientToken || clientToken.length === 0) {
      throw new GenerateTokenError();
    }

    return { url: `${env.DASHBOARD_URL}/auth/recovery?token=${clientToken}` };
  }
}
