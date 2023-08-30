import { configDotenv } from "dotenv";
import { resolve } from "path";

configDotenv({
  path: resolve("../../.env.local")
});
