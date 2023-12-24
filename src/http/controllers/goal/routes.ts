import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { list } from './list';

export const goalsRouter = Router();

goalsRouter.get('/:id/goals', verifyAccessToken, list);
