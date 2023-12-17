import { makeList } from '@/use-cases/factories/institution/make-list';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function list(request: Request, response: Response) {
  const listQuerySchema = z.object({
    populate: z.string().optional(),
  });

  const { populate } = listQuerySchema.parse(request.query);

  try {
    const listCase = makeList();

    const { institutions } = await listCase.execute({ filter: { populate } });

    return response.status(200).json({ data: institutions });
  } catch (error) {
    if (error instanceof PrismaClientUnknownRequestError) {
      return response.status(400).json({ message: 'invalid populate query' });
    }

    throw error;
  }
}
