import { planningsRouter } from '@/http/controllers/planning/routes';
import { usersRouter } from '@/http/controllers/user/routes';
import { Router } from 'express';

export const routes = Router();

routes.use('/users', usersRouter);
routes.use('/plannings', planningsRouter);
