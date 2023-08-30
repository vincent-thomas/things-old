import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";

import * as schema from "./schema";
import { env } from "src/env";

const connection = createPool({
  uri: env.getEnv("databaseUrl")
});

export const db = drizzle(connection, { schema, mode: "default" });
