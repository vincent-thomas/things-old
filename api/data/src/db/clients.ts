// import { drizzle } from 'drizzle-orm/planetscale-serverless';
// import { connect } from '@planetscale/database';
import * as schema from './schema';

// const connection = connect({
//   url: process.env.AUTH_DATABASE_URL,
// });

// export const db = drizzle(connection, { schema });
import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import { env } from '../env';

/* eslint-disable */
// @ts-ignore
const connection = await mysql.createConnection({
  uri: env.API_DATABASE_URL,
});

export const db = drizzle(connection, { schema });
