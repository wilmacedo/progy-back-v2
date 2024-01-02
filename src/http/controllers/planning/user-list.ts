import { makeUserList } from '@/use-cases/factories/planning/make-user-list';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function userList(request: Request, response: Response) {
  const metricsParamsSchema = z.object({
    id: z
      .custom<number>()
      .refine(value => value ?? false, 'Required')
      .refine(value => Number.isFinite(Number(value)), 'Invalid number')
      .transform(value => Number(value)),
  });

  const { id } = metricsParamsSchema.parse(request.params);

  const listCase = makeUserList();

  const { users } = await listCase.execute({
    planningId: id,
  });

  return response.status(200).json({ data: users });
}
