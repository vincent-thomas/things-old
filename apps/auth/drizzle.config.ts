import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';
import { env } from '@auth/env.mjs';
config();
export default {
  schema: './apps/auth/db/schema/index.ts',
  out: './apps/auth/db/drizzle-output',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: env.AUTH_DATABASE_URL,
  },
} satisfies Config;
