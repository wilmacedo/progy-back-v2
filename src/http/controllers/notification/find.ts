import { UserNotFoundError } from '@/use-cases/error/user-not-found-error';
import { makeFind } from '@/use-cases/factories/notification/make-find';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function find(request: Request, response: Response) {
  const findParamsSchema = z.object({
    id: z
      .custom<number>()
      .refine(value => value ?? false, 'Required')
      .refine(value => Number.isFinite(Number(value)), 'Invalid number')
      .transform(value => Number(value)),
  });

  const { id } = findParamsSchema.parse(request.params);

  try {
    const findCase = makeFind();

    const { notification } = await findCase.execute({ userId: id });
    const result = {
      userId: id,
      activity: notification.activity,
    };

    return response.status(200).json({ data: result });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return response.status(404).json({ message: error.message });
    }

    throw error;
  }
}
