import { GenerateTokenError } from '@/use-cases/error/generate-token-error';
import { InvalidTokenError } from '@/use-cases/error/invalid-token-error';
import { UserAlreadyExists } from '@/use-cases/error/user-already-exists-error';
import { makeRedirect } from '@/use-cases/factories/email/make-redirect';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function redirect(request: Request, response: Response) {
  const redirectQuerySchema = z.object({
    token: z.string(),
  });

  const { token } = redirectQuerySchema.parse(request.query);

  try {
    const redirectCase = makeRedirect();

    const { url } = await redirectCase.execute({ token });

    return response.redirect(url);
  } catch (error) {
    if (
      error instanceof UserAlreadyExists ||
      error instanceof InvalidTokenError
    ) {
      return response.status(400).json({ message: error.message });
    } else if (error instanceof GenerateTokenError) {
      return response.status(500).json({ message: error.message });
    }

    throw error;
  }
}
