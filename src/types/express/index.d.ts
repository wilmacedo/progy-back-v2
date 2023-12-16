import { AccessTokenData } from '../access-token';

declare global {
  namespace Express {
    interface Request {
      userData: AccessTokenData;
    }
  }
}

export {};
