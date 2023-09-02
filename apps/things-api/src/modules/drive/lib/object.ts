import { createDBObject, uploadObject } from "@core/data";

interface CreateObjectI {
  filename: string;
  fileType: string;
}

export const createObject = async (
  folderId: string,
  userId: string,
  meta: CreateObjectI,
  body: Buffer
) => {
  const result = await createDBObject(
    {
      folderId,
      userId
    },
    meta
  );

  if (!result.success || !result.data?.objectId) {
    return { success: false };
  }

  const uploadResult = await uploadObject(
    userId,
    result.data.objectId,
    result.data.encryptionKey,
    body
  );
  return uploadResult;
};
