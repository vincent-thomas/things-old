import { InferModel, relations } from 'drizzle-orm';
import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { user } from './user';

export const session = mysqlTable('sessions', {
  sessionId: varchar('id', { length: 32 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  expires: timestamp('expires').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type Session = InferModel<typeof session>; // return type when queried
export type NewSession = InferModel<typeof session, 'insert'>; // insert type

export const sessionUserRelation = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const authCode = mysqlTable('authentication_codes', {
  code: varchar('authentication_code', { length: 32 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  scope: varchar('scope', { length: 256 }).notNull(),
  expires: timestamp('expires').notNull(),
});

export type AuthCode = InferModel<typeof authCode>; // return type when queried
export type NewAuthCode = InferModel<typeof authCode, 'insert'>; // insert type

export const authCodeUserRelations = relations(authCode, ({ one }) => ({
  user: one(user, {
    fields: [authCode.userId],
    references: [user.id],
  }),
}));
