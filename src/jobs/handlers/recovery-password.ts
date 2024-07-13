import { env } from '@/env';
import { Mailer } from '@/lib/mailer';
import { Job, JobType } from '@/lib/queue/types';
import { Logger } from '@/logger';
import { UserRepository } from '@/repositories/user-repository';
import { Cryptograph } from '@/utils/cryptograph';

interface RecoveryPasswordData {
  email: string;
}

export class RecoveryPasswordJob implements Job {
  name = JobType.RECOVERY_PASSWORD;

  constructor(private userRepository: UserRepository) {}

  async execute({ email }: RecoveryPasswordData): Promise<void> {
    const mailer = new Mailer();
    const crypto = new Cryptograph();

    const date = new Date();
    date.setDate(date.getDate() + 1);

    const encrypted = crypto.encrypt({
      email,
      expiration: date.getTime(),
    });
    if (!encrypted) {
      throw new Error('failed on encrypt recovery password data');
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      Logger.error(
        `queue: ${JobType.RECOVERY_PASSWORD}`,
        `Cannot find user by email: ${email}`,
      );
    }

    await await mailer.sendMail({
      to: { name: user ? user.name : 'Usuário', email },
      subject: 'Recuperação de senha',
      title: 'Recuperação de senha',
      description: 'Clique no botão abaixo para criar uma nova senha',
      button: 'Recuperar',
      link: `${env.API_URL}/email/password-recovery/redirect?token=${encrypted}`,
    });
  }
}
