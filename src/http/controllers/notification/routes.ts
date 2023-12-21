import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { find } from './find';

export const notificationsRouter = Router();

notificationsRouter.get('/:id', verifyAccessToken, find);
