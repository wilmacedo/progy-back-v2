import { verifyAccessToken } from '@/http/middleware/verify-access-token';
import { Router } from 'express';
import { authenticate } from './authenticate';
import { list } from './list';
import { me } from './me';
import { register } from './register';
import { sendInvite } from './send-invite';
import { update } from './update';
import { passwordRecovery } from './password-recovery';

export const usersRouter = Router();

usersRouter.post('/authenticate', authenticate);
usersRouter.post('/password-recovery', passwordRecovery);

usersRouter.post('/send-invite', verifyAccessToken, sendInvite);
usersRouter.post('/', verifyAccessToken, register);
usersRouter.get('/', verifyAccessToken, list);
usersRouter.get('/me', verifyAccessToken, me);
usersRouter.put('/:id', verifyAccessToken, update);
