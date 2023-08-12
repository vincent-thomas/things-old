import { S3Client } from '@aws-sdk/client-s3';
import {env} from "./env";
import { createClient, type RedisClientType } from 'redis';

const s3 = new S3Client({
  region: env.getEnv("s3Region"),
  endpoint: `https://${env.getEnv("s3AccountId")}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.getEnv("s3Key"),
    secretAccessKey: env.getEnv("s3Secret"),
  },
});

const redis = createClient({
  url: env.getEnv("redisUrl"),
}) as RedisClientType;

await redis.connect();

export { redis, s3 };
