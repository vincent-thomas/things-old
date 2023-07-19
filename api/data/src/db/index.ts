import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import * as schema from './schema';

const connection = connect({
  url: process.env.AUTH_DATABASE_URL,
});

export const db = drizzle(connection, { schema });
