import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { list } from './list';

export const planningsRouter = Router();

planningsRouter.get('/', verifyAccessToken, list);
