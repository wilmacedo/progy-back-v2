import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { list } from './list';

export const statesRouter = Router();

statesRouter.get('/:id/states', verifyAccessToken, list);
