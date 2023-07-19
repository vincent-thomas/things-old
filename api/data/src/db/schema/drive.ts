import { binary, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const folder = mysqlTable('folders', {
  id: varchar('id', { length: 36 }).primaryKey(),
  folderName: varchar('folderName', { length: 36 }).notNull(),
  ownedById: varchar('ownedById', { length: 36 }).notNull(),
  parentFolderId: varchar('id', { length: 36 }),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const folderRelation = relations(folder, ({ one, many }) => ({
  folders: many(folder, { relationName: 'child_folder' }),
  parentFolder: one(folder, {
    fields: [folder.parentFolderId],
    references: [folder.id],
    relationName: 'child_folder',
  }),
  files: many(file),
}));

export const file = mysqlTable('files', {
  id: varchar('id', { length: 36 }).primaryKey(),
  filename: varchar('filename', { length: 36 }).notNull(),
  ownedById: varchar('ownedById', { length: 36 }).notNull(),
  fileType: varchar('fileType', { length: 3 }).notNull(),
  encryptionKey: binary('encryptionKey', {
    length: 32,
  }).notNull(),
  parentFolderId: varchar('id', { length: 36 }),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const fileRelation = relations(file, ({ one }) => ({
  parentFolder: one(folder, {
    fields: [file.parentFolderId],
    references: [folder.id],
  }),
}));
