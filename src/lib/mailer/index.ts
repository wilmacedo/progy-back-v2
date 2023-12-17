import { env } from '@/env';
import nodemailer, { Transporter } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import path from 'path';
import { MailOptions } from './types';

export class Mailer {
  transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.MAIL_HOST,
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS,
      },
    });
  }

  generateOptions(): hbs.NodemailerExpressHandlebarsOptions {
    return {
      viewEngine: {
        extname: '.html',
        partialsDir: path.resolve('./src/lib/mailer/templates'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./src/lib/mailer/templates'),
      extName: '.html',
    };
  }

  async sendMail(options: MailOptions) {
    this.transporter.use('compile', hbs(this.generateOptions()));

    const { name, email } = options.to;

    const messageInfo = {
      from: `PROGY <no-reply@progy.com.br>`,
      to: `${name} <${email}>`,
      template: 'index',
      subject: options.subject,
      attachments: [
        {
          filename: 'logo.png',
          path: path.resolve('./src/lib/mailer/images/logo.png'),
          cid: 'logo',
        },
      ],
      context: { ...options },
    };

    return this.transporter.sendMail(messageInfo);
  }
}
