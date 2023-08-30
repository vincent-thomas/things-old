import type { Config } from "drizzle-kit";
import { configDotenv } from "dotenv";
import { resolve } from "path";

configDotenv({ path: resolve(".env"), debug: true });

if (process.env.NODE_ENV === "development") {
  configDotenv({ path: resolve("apps/things-api/.env"), debug: true });
}
export default {
  schema: "./src/core/data/db/schema/index.ts",
  out: "./src/core/data/db/drizzle-output",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.API_DATABASE_URL as string
  }
} satisfies Config;
