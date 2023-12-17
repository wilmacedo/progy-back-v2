import { activitiesRouter } from '@/http/controllers/activity/routes';
import { initiativesRouter } from '@/http/controllers/initiative/routes';
import { institutionsRouter } from '@/http/controllers/institution/routes';
import { planningsRouter } from '@/http/controllers/planning/routes';
import { statesRouter } from '@/http/controllers/state/routes';
import { usersRouter } from '@/http/controllers/user/routes';
import { Router } from 'express';

export const routes = Router();

routes.use('/users', usersRouter);
routes.use('/plannings', planningsRouter);
routes.use('/plannings', activitiesRouter);
routes.use('/plannings', statesRouter);
routes.use('/plannings', initiativesRouter);
routes.use('/institutions', institutionsRouter);
