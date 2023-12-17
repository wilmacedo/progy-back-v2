export interface MailOptions {
  subject: string;
  to: {
    name: string;
    email: string;
  };
  title: string;
  description: string;
  action?: string;
  link: string;
  button: string;
}
