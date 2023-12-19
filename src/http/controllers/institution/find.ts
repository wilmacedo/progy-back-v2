import { InstitutionNotFoundError } from '@/use-cases/error/institution-not-found-error';
import { makeFindCase } from '@/use-cases/factories/institution/make-find';
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
    const findCase = makeFindCase();

    const { institution } = await findCase.execute({
      id,
    });

    const { id: institutionId, name, code } = institution;
    const result = {
      id: institutionId,
      name,
      code,
    };

    return response.status(200).json({ data: result });
  } catch (error) {
    if (error instanceof InstitutionNotFoundError) {
      return response.status(404).json({ message: error.message });
    }

    throw error;
  }
}
