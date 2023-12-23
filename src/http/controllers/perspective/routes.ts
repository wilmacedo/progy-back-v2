import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { list } from './list';

export const perspectivesRouter = Router();

perspectivesRouter.get('/:id/perspectives', verifyAccessToken, list);
