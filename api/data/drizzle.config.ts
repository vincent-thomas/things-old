import type { Config } from 'drizzle-kit';
import 'dotenv/config';
import { env } from './src/env';

export default {
  schema: './api/data/src/db/schema/index.ts',
  out: './api/data/src/db/drizzle-output',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: env.API_DATABASE_URL,
  },
} satisfies Config;
