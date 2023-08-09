import { and, eq } from 'drizzle-orm';
import { db } from '../../db/clients';
import { folder } from '../../db/schema';
import { uid } from 'uid/secure';
import {ERROR_TYPE} from "@things/express-func";
interface Inputs {
  ownerId: string;
  folderKey: string;
  parentFolderId?: string;
}

export const createFolder = async ({
  folderKey,
  parentFolderId,
  ownerId,
}: Inputs) => {
  const rootFolder = await db.query.folder.findMany({
    where: and(
      eq(folder.folderName, folderKey),
      eq(folder.ownedById, ownerId),
      parentFolderId ? eq(folder.parentFolderId, parentFolderId) : undefined,
    ),
  });
  const duplicates = rootFolder.filter(v => v.parentFolderId === null)
  if (duplicates.length > 0) {
    throw { cause: ERROR_TYPE.CONFLICT };
  }

  const data = {
    id: uid(6),
    folderName: folderKey,
    ownedById: ownerId,
    parentFolderId,
    createdAt: new Date(),
  } as const;
  await db.insert(folder).values(data);
  return data;
};

interface DeleteFolderInputs {
  folderId: string;
  ownerId: string;
}

export const deleteFolder = async ({
  folderId,
  ownerId,
}: DeleteFolderInputs) => {
  await db
    .delete(folder)
    .where(and(eq(folder.id, folderId), eq(folder.ownedById, ownerId)));
};

export const getFolders = async (
  userId: string,
  parentFolderId: string | null,
  files = false,
  folders = false
) => {
  const isRootFolder = parentFolderId === null;
  const f = await db.query.folder.findMany({
    where: and(
      eq(folder.ownedById, userId),
      isRootFolder ? undefined : eq(folder.id, parentFolderId)
    ),
    with: {
      files: files
        ? {
            columns: {
              encryptionKey: false,
            },
          }
        : undefined,
      folders: folders ? true : undefined,
    },
  });
  return f.filter(
    (v) => !(parentFolderId === null && v.parentFolderId !== null)
  );
};
