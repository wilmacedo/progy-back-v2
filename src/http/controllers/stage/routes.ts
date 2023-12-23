import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { list } from './list';

export const stagesRouter = Router();

stagesRouter.get('/:id/stages', verifyAccessToken, list);
