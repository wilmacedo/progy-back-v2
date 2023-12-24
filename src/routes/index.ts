import { activitiesRouter } from '@/http/controllers/activity/routes';
import { emailsRouter } from '@/http/controllers/email/routes';
import { fontsRouter } from '@/http/controllers/font/routes';
import { initiativesRouter } from '@/http/controllers/initiative/routes';
import { institutionsRouter } from '@/http/controllers/institution/routes';
import { notificationsRouter } from '@/http/controllers/notification/routes';
import { perspectivesRouter } from '@/http/controllers/perspective/routes';
import { planningsRouter } from '@/http/controllers/planning/routes';
import { stagesRouter } from '@/http/controllers/stage/routes';
import { statesRouter } from '@/http/controllers/state/routes';
import { unitsRouter } from '@/http/controllers/unit/routes';
import { usersRouter } from '@/http/controllers/user/routes';
import { Router } from 'express';

export const routes = Router();

routes.use('/users', usersRouter);
routes.use('/plannings', planningsRouter);
routes.use('/plannings', activitiesRouter);
routes.use('/plannings', statesRouter);
routes.use('/plannings', initiativesRouter);
routes.use('/plannings', stagesRouter);
routes.use('/plannings', perspectivesRouter);
routes.use('/plannings', unitsRouter);
routes.use('/plannings', fontsRouter);
routes.use('/institutions', institutionsRouter);
routes.use('/email', emailsRouter);
routes.use('/notifications', notificationsRouter);
