import {
  binary,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { InferModel, relations } from 'drizzle-orm';
import { authCode, session } from './auth';

export const user = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  encryptionKey: binary('encryptionKey', {
    length: 32,
  }).notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const usersRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  authCodes: many(authCode),
}));

export type User = InferModel<typeof user>; // return type when queried
export type NewUser = InferModel<typeof user, 'insert'>; // insert type
