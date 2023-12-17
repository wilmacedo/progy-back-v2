import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { list } from './list';

export const activitiesRouter = Router();

activitiesRouter.get('/:id/activities', verifyAccessToken, list);
