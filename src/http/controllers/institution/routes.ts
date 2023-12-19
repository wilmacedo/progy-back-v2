import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { find } from './find';
import { list } from './list';

export const institutionsRouter = Router();

institutionsRouter.get('/', verifyAccessToken, list);
institutionsRouter.get('/:id', verifyAccessToken, find);
