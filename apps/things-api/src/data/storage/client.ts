import { S3Client } from "@aws-sdk/client-s3";
import { env } from "src/env";

export const s3 = new S3Client({
  endpoint: `https://${env.getEnv("s3AccountId")}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.getEnv("s3Key"),
    secretAccessKey: env.getEnv("s3Secret")
  }
});
