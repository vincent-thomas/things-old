import { and, eq } from "drizzle-orm";
import { db } from "../client";
import { file, folder } from "../schema";
import { randomUUID } from "crypto";
import { env } from "src/env";
import { pbkdf2Sync } from "crypto";
import { toBuffer } from "@things/format";
import { uid } from "uid/secure";

export const getFolder = async (userId: string, folderId: string) => {
  return await db.query.folder.findFirst({
    where: and(eq(folder.id, folderId), eq(folder.ownedById, userId))
  });
};

export const getDBObject = async (userId: string, objectId: string) => {
  const result = await db.query.file.findFirst({
    where: eq(file.id, objectId),
    with: {
      parentFolder: {
        columns: {
          ownedById: true
        }
      }
    }
  });

  if (
    !result ||
    result?.parentFolder === null ||
    result.parentFolder.ownedById != userId
  ) {
    return { success: false, data: null };
  }

  const { parentFolder, ...toReturn } = result;

  return { success: true, data: toReturn };
};

export type RequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>;

interface ShitToRemove {
  createdAt: unknown;
  id: unknown;
  parentFolderId: unknown;
  encryptionKey: unknown;
}

interface Meta {
  folderId: string;
  userId: string;
}

/**
 * @private SHOULD NOT BE USED WITHIN HIGH-LEVEL LOGIC
 */
export const createDBObject = async (
  meta: Meta,
  data: Omit<typeof file.$inferInsert, keyof ShitToRemove>
) => {
  const parent = await db.query.folder.findFirst({
    where: eq(folder.id, meta.folderId)
  });
  if (!parent) {
    return { success: false, error: "FOLDER_DOESNT_EXIST" };
  }

  // TODO

  const id = randomUUID();

  const result = pbkdf2Sync(
    toBuffer(`${env.getEnv("masterEncKey")}${meta.userId}`, "utf-8"),
    toBuffer(uid(16), "utf-8"),
    100_000,
    32,
    "sha1"
  );
  console.log(result);
  // const encryptionKey = env.getEnv("masterEncKey");
  await db
    .insert(file)
    .values({ ...data, parentFolderId: meta.folderId, encryptionKey: "TEST" });
  return { success: true };
};

/**
 * @private SHOULD NOT BE USED WITHIN HIGH-LEVEL LOGIC
 */
export const deleteDBObject = async (objectId: string) => {
  await db.delete(file).where(eq(file.id, objectId));
};

interface UpdateDBObject {
  fileKey?: string;
}

export const updateDBObject = async (
  objectId: string,
  { fileKey }: UpdateDBObject
) => {
  try {
    await db
      .update(file)
      .set({
        filename: fileKey
      })
      .where(eq(file.id, objectId));
    return { success: true };
  } catch (e: any) {
    if (e.message === "No values to set") {
      return { success: false, error: "NO_VALUES_TO_SET" };
    }

    console.trace(e);
    return { success: false, error: "Unknown" };
  }
};
