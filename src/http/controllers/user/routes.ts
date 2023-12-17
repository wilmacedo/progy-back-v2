import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { authenticate } from './authenticate';
import { me } from './me';
import { register } from './register';

export const usersRouter = Router();

usersRouter.post('/', register);
usersRouter.post('/authenticate', authenticate);
usersRouter.get('/me', verifyAccessToken, me);
