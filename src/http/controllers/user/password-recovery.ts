import { UserNotFoundError } from '@/use-cases/error/user-not-found-error';
import { makePasswordRecovery } from '@/use-cases/factories/user/make-password-recovery';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function passwordRecovery(request: Request, response: Response) {
  const passwordRecoverySchema = z.object({
    email: z.string().email(),
  });

  const { email } = passwordRecoverySchema.parse(request.body);

  try {
    const passwordRecoveryCase = makePasswordRecovery();

    await passwordRecoveryCase.execute({ email });

    return response.sendStatus(201);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return response.status(404).json({ message: error.message });
    }

    throw error;
  }
}
