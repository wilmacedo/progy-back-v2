export interface Job {
  cronTime?: string;
  name: JobType;

  execute(params?: unknown): Promise<void>;
}

export enum JobType {
  VALIDATE_ACTIVITY = 'validate-activity',
  SEND_INVITE = 'send-invite',
  RECOVERY_PASSWORD = 'recovery-password',
}
