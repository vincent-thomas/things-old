import { RedisClientType, createClient } from 'redis';

export const redis = createClient({
  url: process.env.API_REDIS_URL,
}) as RedisClientType;

await redis.connect();
