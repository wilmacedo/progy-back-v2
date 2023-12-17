import { makeList } from '@/use-cases/factories/user/make-list';
import { RoleAccess, getRoleAccess } from '@/utils/roles';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function list(request: Request, response: Response) {
  const listQuerySchema = z.object({
    populate: z.string().optional(),
  });

  const { populate } = listQuerySchema.parse(request.query);

  if (getRoleAccess(request.userData.role) === RoleAccess.LOW) {
    return response
      .status(401)
      .json({ error: "You don't have permission to access this" });
  }

  try {
    const listCase = makeList();

    const { users } = await listCase.execute({ filter: { populate } });

    return response.status(200).json({
      data: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        institution_id: user.institution_id,
        unit_id: user.unit_id,
      })),
    });
  } catch (error) {
    if (error instanceof PrismaClientUnknownRequestError) {
      return response.status(400).json({ message: 'invalid populate query' });
    }

    throw error;
  }
}
