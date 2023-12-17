import { Router } from 'express';
import { redirect } from './redirect';

export const emailsRouter = Router();

emailsRouter.get('/invite/redirect', redirect);
