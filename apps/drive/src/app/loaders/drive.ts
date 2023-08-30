import { QueryClient } from "@tanstack/react-query";
import { foldersFetcher } from "@things/drive-queries";

export const browseFoldersLoader =
  (queryClient: QueryClient) => async ({ params }: any) => {
    const query = browserFolderLoaderSettings(params.folderId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const browserFolderLoaderSettings = (folderId: string) => ({
  queryFn: () =>
    foldersFetcher(localStorage.getItem("access_token") as string, folderId, {
      files: true,
      folder: true
    }),
  queryKey: ["fetchFolders", `folder-${folderId}`]
});
