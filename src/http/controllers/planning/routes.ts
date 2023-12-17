import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { list } from './list';
import { metrics } from './metrics';

export const planningsRouter = Router();

planningsRouter.get('/', verifyAccessToken, list);
planningsRouter.get('/:id/metrics', verifyAccessToken, metrics);
