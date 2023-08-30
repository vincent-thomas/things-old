import { createClient } from "redis";
import { env } from "src/env";

const redis = createClient({
  url: env.getEnv("redisUrl")
});

redis.connect();

export { redis };
