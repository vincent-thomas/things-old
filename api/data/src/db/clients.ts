import * as schema from './schema';

import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import { env } from '../env';



const connection = await mysql.createConnection({
  uri: env.getEnv("databaseUrl"),
});

export const db = drizzle(connection, { schema });
