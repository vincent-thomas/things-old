"use client";

import { useRouter } from "next/navigation";

interface IFolder {
  id: string;
  parentFolderId: string | null;
  key: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Folder = ({ folder }: { folder: IFolder }) => {
  const router = useRouter();
  const test = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  return (
    <div
      className="flex rounded-xl bg-gray-200"
      role="button"
      onMouseOver={() => router.prefetch(`/drive/${folder.id}`)}
      onClick={() => router.push(`/drive/${folder.id}`)}
    >
      <div className="px-4 py-3">
        <svg viewBox="0 0 24 24" fill="gray" height="1.5em" width="1.5em">
          <path d="M20 5h-9.586L8.707 3.293A.997.997 0 008 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z" />
        </svg>
      </div>

      <div className="w-44 self-center">{folder.key}</div>
      <div className="mr-2 self-center" role="button" onClick={test}>
        <svg
          viewBox="0 0 20 20"
          focusable="false"
          width="20px"
          height="20px"
          fill="currentColor"
        >
          <path fill="none" d="M0 0h20v20H0V0z"></path>
          <path d="M10 6c.82 0 1.5-.68 1.5-1.5S10.82 3 10 3s-1.5.67-1.5 1.5S9.18 6 10 6zm0 5.5c.82 0 1.5-.68 1.5-1.5s-.68-1.5-1.5-1.5-1.5.68-1.5 1.5.68 1.5 1.5 1.5zm0 5.5c.82 0 1.5-.67 1.5-1.5 0-.82-.68-1.5-1.5-1.5s-1.5.68-1.5 1.5c0 .83.68 1.5 1.5 1.5z"></path>
        </svg>
      </div>
    </div>
  );
};
