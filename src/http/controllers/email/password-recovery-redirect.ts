import { GenerateTokenError } from '@/use-cases/error/generate-token-error';
import { InvalidTokenError } from '@/use-cases/error/invalid-token-error';
import { UserNotFoundError } from '@/use-cases/error/user-not-found-error';
import { makePasswordRecoveryRedirect } from '@/use-cases/factories/email/make-password-recovery-redirect';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function passwordRecoveryRedirect(
  request: Request,
  response: Response,
) {
  const redirectQuerySchema = z.object({
    token: z.string(),
  });

  const { token } = redirectQuerySchema.parse(request.query);

  try {
    const passwordRecoveryRedirectCase = makePasswordRecoveryRedirect();

    const { url } = await passwordRecoveryRedirectCase.execute({ token });

    return response.redirect(url);
  } catch (error) {
    if (
      error instanceof UserNotFoundError ||
      error instanceof InvalidTokenError
    ) {
      return response.status(400).json({ message: error.message });
    } else if (error instanceof GenerateTokenError) {
      return response.status(500).json({ message: error.message });
    }

    throw error;
  }
}
