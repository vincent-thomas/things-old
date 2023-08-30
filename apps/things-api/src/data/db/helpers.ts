import { randomUUID } from "crypto";
import { timestamp, varchar } from "drizzle-orm/mysql-core";

export const createdAt = (name: string) =>
  timestamp(name).defaultNow().notNull();

export const userId = (columnName: string) =>
  varchar(columnName, { length: 36 }).notNull();

export const id = varchar("id", { length: 36 })
  .primaryKey()
  .$defaultFn(() => randomUUID());
