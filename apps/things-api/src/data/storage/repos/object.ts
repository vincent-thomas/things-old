import { env } from "src/env";
import { s3 } from "../client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { encrypt } from "@things/crypto";
import { fromBuffer } from "@things/format";

export const uploadObject = async (
  userId: string,
  objectId: string,
  encryptionKey: Buffer,
  Body: Buffer
) => {
  const toSend = encrypt(fromBuffer(Body), encryptionKey);
  try {
    const command = new PutObjectCommand({
      Bucket: env.getEnv("s3Bucket"),
      Key: `${userId}/drive/${objectId}`,
      Body: toSend
    });
    await s3.send(command);
    return { success: true };
  } catch (e) {
    console.trace(e);
    return { success: false };
  }
};
