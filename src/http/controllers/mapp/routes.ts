import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { list } from './list';

export const mappsRouter = Router();

mappsRouter.get('/:id/mapps', verifyAccessToken, list);
