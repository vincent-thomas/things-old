import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DRIVE_AUTH_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    S3_FILES_KEY: z.string(),
    S3_FILES_REGION: z.string(),
    S3_FILES_SECRET: z.string(),
    S3_FILES_BUCKET: z.string(),
    DATABASE_URL: z.string().url(),
    REDIS_URL: z.string().url(),
    DRIVE_APP_URL: z.string().url(),
  },

  client: {},

  runtimeEnv: {
    DRIVE_AUTH_URL: process.env.DRIVE_AUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
    APP_URL: process.env.DRIVE_APP_URL,
    S3_FILES_REGION: process.env.S3_FILES_REGION,
    S3_FILES_KEY: process.env.S3_FILES_KEY,
    S3_FILES_SECRET: process.env.S3_FILES_SECRET,
    S3_FILES_BUCKET: process.env.S3_FILES_BUCKET,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
