import { S3Client } from '@aws-sdk/client-s3';
import { env } from './env';

export const s3 = new S3Client({
  region: env.API_S3_REGION,
  endpoint: `https://${env.API_S3_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.API_S3_KEY,
    secretAccessKey: env.API_S3_SECRET,
  },
});
