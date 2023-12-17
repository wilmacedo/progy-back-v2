import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { list } from './list';

export const institutionsRouter = Router();

institutionsRouter.get('/', verifyAccessToken, list);
