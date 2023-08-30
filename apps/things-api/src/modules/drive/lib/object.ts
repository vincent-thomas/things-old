import { createDBObject } from "@core/data";

interface CreateObjectI {
  filename: string;
  fileType: string;
}

export const createObject = async (folderId: string, data: CreateObjectI) => {
  const reuslt = await createDBObject(folderId, {});
};
