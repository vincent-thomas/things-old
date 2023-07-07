import { api } from "@/services/api";

import type { ServerPage } from "@/types/page";
import type { File } from "@prisma/client";
import { DeleteFileButton } from "./delete-file-button";
import { Folder } from "./folder";

const Page = async ({ params }: ServerPage) => {
  const user = await api.getUser();

  const folder = await api.getFolder(
    user?.id as string,
    params.folderId as string
  );
  const { files, folders } = await api.getFolderContent(
    user?.id as string,
    folder?.id as string
  );
  return (
    <div className="bg-gray-150 m-10">
      {folders.length > 0 && (
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Folders</h1>
          <div className="flex w-[100%] flex-wrap justify-start gap-x-6 gap-y-10 self-center">
            {folders.map((v) => (
              <Folder key={v.id} folder={v} />
            ))}
          </div>
        </div>
      )}
      {files.length > 0 && (
        <div>
          <h1 className="text-2xl font-bold">Files</h1>
          <div className="flex flex-col gap-4">
            {files.map((file: File) => (
              <div key={file.id} className="flex gap-4">
                <a href={`/api/export-file/${file.id}`}>{file.filename}</a>
                <DeleteFileButton fileId={file.id} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
