import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { findById } from './find-by-id';
import { list } from './list';

export const activitiesRouter = Router();

activitiesRouter.get('/:id/activities', verifyAccessToken, list);
activitiesRouter.get(
  '/:id/activities/:activityId',
  verifyAccessToken,
  findById,
);
