import { S3Client } from '@aws-sdk/client-s3';
import { env } from './env';
import { createClient, type RedisClientType } from 'redis';

const s3 = new S3Client({
  region: env.API_S3_REGION,
  endpoint: `https://${env.API_S3_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.API_S3_KEY,
    secretAccessKey: env.API_S3_SECRET,
  },
});

const redis = createClient({
  url: env.API_REDIS_URL,
}) as RedisClientType;

await redis.connect();

export { redis, s3 };
