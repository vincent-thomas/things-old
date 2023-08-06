import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import { env } from '@auth/env.mjs';

const connection = await mysql.createConnection({
  uri: env.AUTH_DATABASE_URL,
});

export const db = drizzle(connection, { schema });
