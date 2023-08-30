import {
  binary,
  mysqlTable,
  uniqueIndex,
  varchar
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { createdAt, userId, id } from "../helpers";

export const fileType = varchar("fileType", { length: 3 }).notNull();

export const folder = mysqlTable(
  "folders",
  {
    id,
    folderName: varchar("folderName", { length: 36 }).notNull(),
    ownedById: userId("ownedById"),
    parentFolderId: varchar("parentFolderId", { length: 36 }),
    createdAt: createdAt("created_at")
  },
  (folder) => ({
    nameIndex: uniqueIndex("folder_name").on(
      folder.folderName,
      folder.parentFolderId
    )
  })
);

export const folderRelation = relations(folder, ({ one, many }) => ({
  folders: many(folder, { relationName: "child_folder" }),
  parentFolder: one(folder, {
    fields: [folder.parentFolderId],
    references: [folder.id],
    relationName: "child_folder"
  }),
  files: many(file)
}));

export const file = mysqlTable("files", {
  id,
  filename: varchar("filename", { length: 36 }).notNull(),
  fileType,
  encryptionKey: binary("encryptionKey", {
    length: 32
  }).notNull(),
  parentFolderId: varchar("parentFolderId", { length: 36 }),
  createdAt: createdAt("created_at")
});

export const fileRelation = relations(file, ({ one }) => ({
  parentFolder: one(folder, {
    fields: [file.parentFolderId],
    references: [folder.id]
  })
}));
