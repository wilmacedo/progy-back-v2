import { PrismaActivityNotification } from '@/repositories/prisma/activity-notification';
import { PrismaActivityRepository } from '@/repositories/prisma/activity-repository';
import { PrismaUserRepository } from '@/repositories/prisma/user-repository';
import { ValidateActivity } from '@/use-cases/jobs/validate-activity';

export function makeValidateActivity() {
  const activityRepository = new PrismaActivityRepository();
  const userRepository = new PrismaUserRepository();
  const activityNotificationRepository = new PrismaActivityNotification();
  const validateActivityCase = new ValidateActivity(
    activityRepository,
    userRepository,
    activityNotificationRepository,
  );

  return validateActivityCase;
}
