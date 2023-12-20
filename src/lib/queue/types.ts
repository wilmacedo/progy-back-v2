export interface Job {
  cronTime: string;
  name: JobType;

  execute(): Promise<void>;
}

export enum JobType {
  VALIDATE_ACTIVITY = 'validate-activity',
  SEND_INVITE = 'send-invite',
}
