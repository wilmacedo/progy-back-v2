import { NotificationRepository } from '@/repositories/notification-repository';
import { UserRepository } from '@/repositories/user-repository';
import { Notification } from '@prisma/client';
import { UserNotFoundError } from '../error/user-not-found-error';

interface Request {
  userId: number;
  activity: boolean;
}

interface Response {
  notification: Notification;
}

export class Update {
  constructor(
    private notificationRepository: NotificationRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ userId, activity }: Request): Promise<Response> {
    const userExists = await this.userRepository.findById(userId);
    if (!userExists) {
      throw new UserNotFoundError();
    }

    const notification = await this.notificationRepository.update(userId, {
      activity,
    });

    return { notification };
  }
}
