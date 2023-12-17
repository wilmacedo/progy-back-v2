import { env } from '@/env';
import { InvalidCredentialsError } from '@/use-cases/error/invalid-credentials-error';
import { MakeAuthenticateCase } from '@/use-cases/factories/user/make-authenticate';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

export async function authenticate(request: Request, response: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = MakeAuthenticateCase();

    const { user } = await authenticateUseCase.execute({ email, password });

    const data = {
      role: user.role,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        institution_id: user.institution_id,
        unit_id: user.unit_id,
      },
    };

    const token = jwt.sign(data, env.JWT_SECRET);

    return response.status(200).json({
      data: {
        ...data,
        token,
      },
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return response.status(401).json({ message: error.message });
    }

    throw error;
  }
}
