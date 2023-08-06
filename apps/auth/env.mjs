import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.string().regex(/production|development/),
  AUTH_REDIS_URL: z.string().url('Unvalid url'),
  AUTH_APP_URL: z.string().url('Unvalid url'),
  AUTH_SIGN_KEY: z.string().length(64, 'Must be 64 characters'),
  AUTH_DATABASE_URL: z.string().url('Unvalid url'),
});

export const env = envSchema.parse(process.env);
