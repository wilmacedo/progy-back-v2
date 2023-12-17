import { makeMetricsCase } from '@/use-cases/factories/planning/make-metrics';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function metrics(request: Request, response: Response) {
  const metricsParamsSchema = z.object({
    id: z
      .custom<number>()
      .refine(value => value ?? false, 'Required')
      .refine(value => Number.isFinite(Number(value)), 'Invalid number')
      .transform(value => Number(value)),
  });

  const { id } = metricsParamsSchema.parse(request.params);

  try {
    const metricsCase = makeMetricsCase();

    const { result } = await metricsCase.execute({
      planningId: id,
      userData: request.userData,
    });

    return response.status(200).json({ data: result });
  } catch (error) {
    return error;
  }
}
