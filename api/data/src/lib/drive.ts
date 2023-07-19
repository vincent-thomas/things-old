import { eq } from 'drizzle-orm';
import { db } from '../db/clients';
import { folder } from '../db/schema';

export const getFolders = async (userId: string, folderId?: string) => {
  const test = await db.select().from(folder).where(eq(folder.id, folderId));
  return test;
};

export const createFolder = async (
  folderKey: string,
  parentFolderId: string
) => {
  // TODO Fixa createFolder functionen
  // await db.insert(folder).values({
  //   id
  // })
};
