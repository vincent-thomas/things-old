import { mysqlTable, varchar, text, boolean } from "drizzle-orm/mysql-core";
import { createdAt, userId } from "../helpers";

export const user = mysqlTable("users", {
  id: userId("id").primaryKey(),
  email: varchar("email", { length: 254 }).unique().notNull(),
  verified_email: boolean("verified_email").notNull().default(false),
  name: text("name").notNull(),
  picture: text("picture"),
  locale: text("locale"),
  updatedAt: createdAt("updated_at"),
  createdAt: createdAt("created_at")
});
