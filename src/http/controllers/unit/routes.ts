import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { list } from './list';

export const unitsRouter = Router();

unitsRouter.get('/:id/units', verifyAccessToken, list);
