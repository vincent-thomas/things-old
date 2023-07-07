import type { ServerPage } from "@drive/types/page";
import { api } from "@drive/services/api";
import Link from "next/link";

const test = async ({ params }: ServerPage) => {
  const user = await api.getUser();
  const folder = await api.getFolder(
    user?.id as string,
    params.folderId as string
  );

  return (
    <>
      <h1 className="bg-gray-100 px-10 py-6">
        {folder?.parentFolder?.key !== "undefined" && (
          <>
            {folder?.key !== "root" && (
              <Link
                href={`/drive/${
                  folder?.parentFolder?.key === "root"
                    ? "root"
                    : folder?.parentFolderId
                }`}
              >
                {folder?.parentFolder?.key}/
              </Link>
            )}
            <span>{folder?.key}</span>
          </>
        )}
      </h1>
    </>
  );
};

export default test;
