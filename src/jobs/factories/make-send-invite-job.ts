import { SendInvite } from '../handlers/send-invite';

export function makeSendInviteJob() {
  return new SendInvite();
}
