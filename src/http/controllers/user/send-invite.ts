import { InstitutionNotFoundError } from '@/use-cases/error/institution-not-found-error';
import { UserAlreadyExists } from '@/use-cases/error/user-already-exists-error';
import { makeSendInvite } from '@/use-cases/factories/user/make-send-invite';
import { RoleAccess, availableRoles, getRoleAccess } from '@/utils/roles';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function sendInvite(request: Request, response: Response) {
  const sendInviteBodySchema = z.object({
    email: z.string(),
    institution_id: z.number(),
    role: z.enum(availableRoles),
  });

  const { email, institution_id, role } = sendInviteBodySchema.parse(
    request.body,
  );

  if (getRoleAccess(request.userData.role) === RoleAccess.LOW) {
    return response
      .status(401)
      .json({ message: "You don't have permission to access this" });
  }

  try {
    const sendInviteCase = makeSendInvite();

    await sendInviteCase.execute({
      email,
      institution_id,
      role,
    });

    return response.sendStatus(201);
  } catch (error) {
    if (
      error instanceof UserAlreadyExists ||
      error instanceof InstitutionNotFoundError
    ) {
      return response.status(409).json({ message: error.message });
    }

    throw error;
  }
}
