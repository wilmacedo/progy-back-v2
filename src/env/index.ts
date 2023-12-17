import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  PORT: z.coerce.number().default(3335),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  JWT_SECRET: z.string(),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  MAIL_HOST: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  API_URL: z.string().default('http://localhost:3333'),
  DASHBOARD_URL: z.string().default('http://localhost:3000'),
});

const _env = schema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format());

  throw new Error('Invalid environment variables');
}

export const env = _env.data;
