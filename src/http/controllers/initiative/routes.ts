import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { list } from './list';

export const initiativesRouter = Router();

initiativesRouter.get('/:id/initiatives', verifyAccessToken, list);
