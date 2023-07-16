import { env } from 'process';
import { createClient } from 'redis';
const redis = createClient({
  url: env.AUTH_REDIS_URL as string,
});
redis.connect();
export { redis };
