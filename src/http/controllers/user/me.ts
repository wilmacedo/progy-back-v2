import { UserNotFoundError } from '@/use-cases/error/user-not-found-error';
import { makeMe } from '@/use-cases/factories/user/make-me';
import { Request, Response } from 'express';

export async function me(request: Request, response: Response) {
  try {
    const me = makeMe();

    const { user } = await me.execute({
      userData: request.userData,
    });

    const { id, name, email, role, institution_id, unit_id } = user;
    const result = {
      id,
      name,
      email,
      role,
      institution_id,
      unit_id,
    };

    return response.status(200).send({ data: result });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return response.status(404).send({ error: 'User not found' });
    }

    throw error;
  }
}
