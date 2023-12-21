import { UserNotFoundError } from '@/use-cases/error/user-not-found-error';
import { makeUpdateCase } from '@/use-cases/factories/notification/make-update';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function update(request: Request, response: Response) {
  const updateBodySchema = z.object({
    activity: z.boolean(),
  });

  const updateParamSchema = z.object({
    id: z
      .custom<number>()
      .refine(value => value ?? false, 'Required')
      .refine(value => Number.isFinite(Number(value)), 'Invalid number')
      .transform(value => Number(value)),
  });

  const { id } = updateParamSchema.parse(request.params);
  const { activity } = updateBodySchema.parse(request.body);

  try {
    const updateCase = makeUpdateCase();

    const { notification } = await updateCase.execute({ userId: id, activity });
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
