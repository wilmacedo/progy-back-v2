import { Request, Response } from 'express';

import { makeListCase } from '@/use-cases/factories/planning/list';

export async function list(request: Request, response: Response) {
  try {
    const listCase = makeListCase();

    const { plannings } = await listCase.execute({
      userData: request.userData,
    });

    return response.status(200).json({ data: plannings });
  } catch (error) {
    return error;
  }
}
