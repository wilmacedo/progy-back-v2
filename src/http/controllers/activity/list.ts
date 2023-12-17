import { makeList } from '@/use-cases/factories/activity/make-list';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function list(request: Request, response: Response) {
  const listParamSchema = z.object({
    id: z
      .custom<number>()
      .refine(value => value ?? false, 'Required')
      .refine(value => Number.isFinite(Number(value)), 'Invalid number')
      .transform(value => Number(value)),
  });

  const listQuerySchema = z.object({
    populate: z.string().optional(),
  });

  const { id } = listParamSchema.parse(request.params);
  const { populate } = listQuerySchema.parse(request.query);

  try {
    const listCase = makeList();

    const { activities } = await listCase.execute({
      planningId: id,
      filter: {
        populate,
      },
    });

    return response.status(200).json({ data: activities });
  } catch (error) {
    return error;
  }
}
