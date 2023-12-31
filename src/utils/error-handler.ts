import { env } from '@/env';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .send({ message: 'Validation error', issues: error.format() });
  }

  if (error instanceof PrismaClientInitializationError) {
    return response
      .status(500)
      .send({ error: 'Server cannot connect with database' });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO: Add some external analytics tool
  }

  return response.status(500).send({ message: 'Internal server error' });
}
