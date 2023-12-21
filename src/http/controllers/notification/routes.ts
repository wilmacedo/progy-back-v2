import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { find } from './find';
import { update } from './update';

export const notificationsRouter = Router();

notificationsRouter.get('/:id', verifyAccessToken, find);
notificationsRouter.put('/:id', verifyAccessToken, update);
