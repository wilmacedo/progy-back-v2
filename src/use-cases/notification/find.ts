import { NotificationRepository } from '@/repositories/notification-repository';
import { UserRepository } from '@/repositories/user-repository';
import { Notification } from '@prisma/client';
import { UserNotFoundError } from '../error/user-not-found-error';

interface Request {
  userId: number;
}

interface Response {
  notification: Notification;
}

export class Find {
  constructor(
    private notificationRepository: NotificationRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ userId }: Request): Promise<Response> {
    const userExists = await this.userRepository.findById(userId);
    if (!userExists) {
      throw new UserNotFoundError();
    }

    let notification = await this.notificationRepository.findByUser(userId);
    if (!notification) {
      notification = await this.notificationRepository.create(userId);
    }

    return { notification };
  }
}
