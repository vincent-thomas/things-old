import { timestamp, varchar } from 'drizzle-orm/mysql-core';

export const createdAt = timestamp('createdAt').defaultNow().notNull();

export const userId = (columnName: string) =>
  varchar(columnName, { length: 36 }).notNull();

export const id = varchar('id', { length: 14 }).primaryKey();
