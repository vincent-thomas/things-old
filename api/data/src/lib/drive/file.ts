import { and, eq } from 'drizzle-orm';
import { db } from '../../db/clients';
import { file } from '../../db/schema';
import { s3 } from '../../clients';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '../../env';
import { uid } from 'uid/secure';
import { decrypt, encrypt, fromBuffer, toBuffer } from '@api/shared';

interface uploadFileInput {
  fileKey: string;
  folderId: string;
  userId: string;
  content: Buffer;
  fileType: string;
}

const getFilePath = (userId: string, key: string) => `${userId}/drive/${key}`;

export const uploadFile = async ({
  fileKey,
  folderId,
  content,
  fileType,
  userId,
}: uploadFileInput) => {
  const encryptionKey = uid(32);
  const fileId = uid(14);

  await db.insert(file).values({
    id: fileId,
    encryptionKey,
    filename: fileKey,
    fileType,
    ownedById: userId,
    parentFolderId: folderId,
    createdAt: new Date(),
  });
  const usableKey = toBuffer(encryptionKey, 'utf-8');

  const sendCommand = new PutObjectCommand({
    Bucket: env.API_S3_BUCKET,
    Key: getFilePath(userId, fileId),
    Body: encrypt(fromBuffer(content, 'utf-8'), usableKey),
  });
  return await s3.send(sendCommand);
};

interface getFileInput {
  fileId: string;
  userId: string;
}

export const getFile = async ({ fileId, userId }: getFileInput) => {
  const { encryptionKey, ...fileRecord } = await db.query.file.findFirst({
    where: and(eq(file.ownedById, userId), eq(file.id, fileId)),
  });
  const getFileCommand = new GetObjectCommand({
    Key: `${userId}/drive/${fileRecord.id}`,
    Bucket: env.API_S3_BUCKET,
  });
  const result = await s3.send(getFileCommand);
  const encryptedBody = await result.Body.transformToString('utf-8');
  const body = decrypt(encryptedBody, toBuffer(encryptionKey, 'utf-8'));

  return { ...fileRecord, body };
};
