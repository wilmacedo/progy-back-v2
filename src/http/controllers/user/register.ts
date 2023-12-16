import { UserAlreadyExists } from '@/use-cases/error/user-already-exists-error';
import { MakeRegisterUserCase } from '@/use-cases/factories/user/make-register';
import { availableRoles } from '@/utils/roles';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function register(request: Request, response: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    institution_id: z.number().min(0).optional(),
    role: z.enum(availableRoles),
  });

  const { name, email, password, institution_id, role } =
    registerBodySchema.parse(request.body);

  try {
    const registerUserUseCase = MakeRegisterUserCase();

    await registerUserUseCase.execute({
      name,
      email,
      password,
      institution_id,
      role,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      return response.status(409).json({ message: error.message });
    }

    return error;
  }

  return response.sendStatus(201);
}
