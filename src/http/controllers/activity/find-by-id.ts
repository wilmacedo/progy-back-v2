import { ActivityNotFoundError } from '@/use-cases/error/activity-not-found-error';
import { makeFindById } from '@/use-cases/factories/activity/make-find-by-id';
import { makeListCase } from '@/use-cases/factories/planning/make-list';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function findById(request: Request, response: Response) {
  const listParamSchema = z.object({
    id: z
      .custom<number>()
      .refine(value => value ?? false, 'Required')
      .refine(value => Number.isFinite(Number(value)), 'Invalid number')
      .transform(value => Number(value)),
    activityId: z
      .custom<number>()
      .refine(value => value ?? false, 'Required')
      .refine(value => Number.isFinite(Number(value)), 'Invalid number')
      .transform(value => Number(value)),
  });

  const listQuerySchema = z.object({
    populate: z.string().optional(),
  });

  const { id, activityId } = listParamSchema.parse(request.params);
  const { populate } = listQuerySchema.parse(request.query);

  const planningListCase = makeListCase();
  const { plannings } = await planningListCase.execute({
    userData: request.userData,
  });
  const hasPermissionOnPlanning = plannings.find(
    planning => planning.id === id,
  );
  if (!hasPermissionOnPlanning) {
    return response
      .status(401)
      .json({ message: "You don't have permission to access this" });
  }

  try {
    const findByIdCase = makeFindById();

    const { activity } = await findByIdCase.execute({
      id: activityId,
      filter: {
        populate,
      },
    });

    return response.status(200).json({ data: activity });
  } catch (error) {
    if (error instanceof ActivityNotFoundError) {
      return response.status(404).json({ message: error.message });
    }

    if (error instanceof PrismaClientUnknownRequestError) {
      return response.status(400).json({ message: 'invalid populate query' });
    }

    throw error;
  }
}
