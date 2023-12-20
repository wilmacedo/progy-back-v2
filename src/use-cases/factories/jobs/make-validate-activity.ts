import { PrismaActivityRepository } from '@/repositories/prisma/activity-repository';
import { ValidateActivity } from '@/use-cases/jobs/validate-activity';

export function makeValidateActivity() {
  const activityRepository = new PrismaActivityRepository();
  const validateActivityCase = new ValidateActivity(activityRepository);

  return validateActivityCase;
}
