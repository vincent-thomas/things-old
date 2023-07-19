import { z } from 'zod';

const envSchema = z.object({
  API_REDIS_URL: z.string().url('Unvalid url'),
  API_URL: z.string().url('Unvalid url'),
  API_DATABASE_URL: z.string().url('Unvalid url'),
  API_S3_KEY: z.string(),
  API_S3_ACCOUNT_ID: z.string(),
  API_S3_SECRET: z.string(),
  API_S3_REGION: z.string(),
});

export const env = envSchema.parse(process.env);
