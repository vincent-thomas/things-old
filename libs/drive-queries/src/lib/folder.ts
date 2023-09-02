import type { SendGenerator } from "@things/express-func";
import { stringify } from "qs";
interface Folder {
  id: string;
  folderName: string;
  ownedById: string;
  parentFolderId: string;
  createdAt: string;
  folders: Folder[];
  files: any;
}
export const foldersFetcher = async (
  token: string,
  parentFolderId: string | undefined,
  { files, folder }: { files: boolean; folder: boolean }
) => {
  const result = await fetch(
    `http://localhost:8080/drive/folder?${stringify({
      folderId: parentFolderId
    })}${files ? `${parentFolderId !== undefined ? "&" : ""}files` : ""}${
      folder ? "&folders" : ""
    }`,
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  );
  const data = (await result.json()) as SendGenerator<Folder[]>;
  if (data.success) {
    const returns = data.data;
    const files = [];
    const folders = [];

    for (const item of returns) {
      if (parentFolderId) {
        files.push(...item.files);
        folders.push(...item.folders);
      } else {
        folders.push(item);
      }
    }

    return { files, folders };
  }
};
