import { env } from '@/env';
import { Mailer } from '@/lib/mailer';
import { Job, JobType } from '@/lib/queue/types';
import { Cryptograph } from '@/utils/cryptograph';

interface SendInviteData {
  email: string;
  institution_id: number;
  role: string;
}

export class SendInvite implements Job {
  name = JobType.SEND_INVITE;

  async execute(data: SendInviteData): Promise<void> {
    const mailer = new Mailer();
    const crypto = new Cryptograph();
    const { email, institution_id, role } = data;

    const date = new Date();
    date.setDate(date.getDate() + 1);

    const encrypted = crypto.encrypt({
      email,
      institution_id,
      role,
      expiration: date.getTime(),
    });
    if (!encrypted) {
      throw new Error('failed on encrypt invite data');
    }

    await mailer.sendMail({
      to: { name: 'Convidado', email },
      subject: 'Convite para participar de um planejamento',
      title: 'Confirme sua participação',
      description:
        'Você foi convidado para participar de um planejamento! Clique no botão abaixo para confirmação seu nome e senha e ative sua conta',
      button: 'participar',
      link: env.API_URL + '/email/invite/redirect?token=' + encrypted,
    });
  }
}
