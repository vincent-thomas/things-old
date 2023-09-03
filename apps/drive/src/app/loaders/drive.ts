import { QueryClient } from "@tanstack/react-query";
import { foldersFetcher } from "../fetchers/folder";

export const browseFoldersLoader =
  (queryClient: QueryClient) => async ({ params }: any) => {
    const query = browserFolderLoaderSettings(params.folderId || "root");

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const browserFolderLoaderSettings = (folderId?: string) => ({
  queryFn: () =>
    foldersFetcher(
      localStorage.getItem("access_token") as string,
      folderId || "root",
      {
        files: true,
        folder: true
      }
    ),
  queryKey: ["fetchFolders", `folder-${folderId || "root"}`]
});
