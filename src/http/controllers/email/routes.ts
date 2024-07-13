import { Router } from 'express';
import { redirect } from './redirect';
import { passwordRecoveryRedirect } from './password-recovery-redirect';

export const emailsRouter = Router();

emailsRouter.get('/invite/redirect', redirect);
emailsRouter.get('/password-recovery/redirect', passwordRecoveryRedirect);
