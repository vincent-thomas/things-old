import { and, eq, isNull } from "drizzle-orm";
import { db } from "../client";
import { file, folder } from "../schema";
import { randomUUID } from "crypto";
import { env } from "src/env";
import { pbkdf2Sync } from "crypto";
import { fromBuffer, toBuffer } from "@things/format";
import { uid } from "uid/secure";

export const getFolder = async (userId: string, folderId?: string) => {
  let theFolderId: string;

  if (folderId === undefined) {
    const result = await db.query.folder.findFirst({
      where: and(eq(folder.ownedById, userId), isNull(folder.parentFolderId))
    });
    if (!result) {
      return null;
    }
    theFolderId = result.id;
  } else {
    theFolderId = folderId;
  }

  return (
    (await db.query.folder.findFirst({
      where: and(eq(folder.id, theFolderId), eq(folder.ownedById, userId))
    })) || null
  );
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
    result.parentFolder.ownedById !== userId
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

  const encryptionKey = pbkdf2Sync(
    toBuffer(`${env.getEnv("masterEncKey")}${meta.userId}${id}`, "utf-8"),
    toBuffer(uid(16), "utf-8"),
    100_000,
    32,
    "sha512"
  );
  const storableEncKey = fromBuffer(encryptionKey);

  // const encryptionKey = env.getEnv("masterEncKey");
  await db.insert(file).values({
    ...data,
    parentFolderId: meta.folderId,
    encryptionKey: storableEncKey
  });
  return { success: true, data: { objectId: id, encryptionKey } };
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

interface Error {
  message: string;
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
  } catch (e) {
    const error = e as Error;
    if (error.message === "No values to set") {
      return { success: false, error: "NO_VALUES_TO_SET" };
    }

    console.trace(e);
    return { success: false, error: "Unknown" };
  }
};
