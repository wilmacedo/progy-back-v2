import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { list } from './list';
import { metrics } from './metrics';
import { userList } from './user-list';

export const planningsRouter = Router();

planningsRouter.get('/', verifyAccessToken, list);
planningsRouter.get('/:id/users', verifyAccessToken, userList);
planningsRouter.get('/:id/metrics', verifyAccessToken, metrics);
