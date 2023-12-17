import { UserNotFoundError } from '@/use-cases/error/user-not-found-error';
import { makeUpdate } from '@/use-cases/factories/user/make-update';
import { RoleAccess, getRoleAccess } from '@/utils/roles';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function update(request: Request, response: Response) {
  const updateBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    role: z.string().optional(),
  });

  const updateParamSchema = z.object({
    id: z
      .custom<number>()
      .refine(value => value ?? false, 'Required')
      .refine(value => Number.isFinite(Number(value)), 'Invalid number')
      .transform(value => Number(value)),
  });

  const { id } = updateParamSchema.parse(request.params);
  const { email, name, role } = updateBodySchema.parse(request.body);

  if (getRoleAccess(request.userData.role) === RoleAccess.LOW) {
    return response
      .status(401)
      .json({ message: "You don't have permission to access this" });
  }

  try {
    const updateCase = makeUpdate();

    const { user } = await updateCase.execute({
      id,
      email,
      name,
      role,
    });

    const { institution_id, unit_id } = user;
    const result = {
      id,
      name: user.name,
      email: user.email,
      role: user.role,
      institution_id,
      unit_id,
    };

    return response.status(200).json({ data: result });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return response.status(404).json({ message: error.message });
    }

    throw error;
  }
}
