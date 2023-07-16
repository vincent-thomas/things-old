import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    AUTH_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    S3_FILES_KEY: z.string(),
    S3_FILES_REGION: z.string(),
    S3_FILES_SECRET: z.string(),
    S3_FILES_BUCKET: z.string(),
    DATABASE_URL: z.string(),
    REDIS_URL: z.string(),
    APP_URL: z.string().url(),
  },

  client: {},

  runtimeEnv: {
    AUTH_URL: process.env.AUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
    APP_URL: `${
      process.env?.IS_DOCKER
        ? 'http'
        : process.env.VERCEL_ENV === 'development'
        ? 'http'
        : 'https'
    }://${
      process.env?.VERCEL_ENV === 'production'
        ? process.env?.IS_DOCKER === 'true'
          ? process.env.VERCEL_URL
          : 'drive.v-thomas.com'
        : process.env.VERCEL_URL
    }`,
    S3_FILES_REGION: process.env.S3_FILES_REGION,
    S3_FILES_KEY: process.env.S3_FILES_KEY,
    S3_FILES_SECRET: process.env.S3_FILES_SECRET,
    S3_FILES_BUCKET: process.env.S3_FILES_BUCKET,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
