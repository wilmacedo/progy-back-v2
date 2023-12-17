import { Request, Response } from 'express';

import { makeListCase } from '@/use-cases/factories/planning/make-list';

export async function list(request: Request, response: Response) {
  const listCase = makeListCase();

  const { plannings } = await listCase.execute({
    userData: request.userData,
  });

  return response.status(200).json({ data: plannings });
}
