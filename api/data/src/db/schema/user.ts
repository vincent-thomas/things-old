import { mysqlTable, varchar, text } from "drizzle-orm/mysql-core";
import { createdAt, userId } from "../helpers";

export const user = mysqlTable('users', {
  id: userId('id').primaryKey(),
  email: varchar('email', { length: 254 }).unique().notNull(),
  password: text('password').notNull(),
  fullName: text('full_name').notNull(),
  updatedAt: createdAt,
  createdAt,
});
