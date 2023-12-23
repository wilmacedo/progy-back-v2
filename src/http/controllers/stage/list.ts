import { makeList } from '@/use-cases/factories/stage/make-list';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';
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

    const { stages } = await listCase.execute({
      planningId: id,
      filter: {
        populate,
      },
    });

    return response.status(200).json({ data: stages });
  } catch (error) {
    if (error instanceof PrismaClientUnknownRequestError) {
      return response.status(400).json({ message: 'invalid populate query' });
    }

    throw error;
  }
}
