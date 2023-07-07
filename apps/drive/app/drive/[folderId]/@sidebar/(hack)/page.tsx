import Link from "next/link";
import { CreateFolderButton } from "../../create-folder-button";
import { CreateFileButton } from "../../create-file.button";
import type { ServerPage } from "@/types/page";

const SideBar = ({ params: p }: ServerPage) => {
  return (
    <aside className="flex flex-col bg-gray-300">
      <Link href="/">
        <section className=" h-[66px] px-8 pt-8">
          <h1 className="text-xl font-bold">TDrive</h1>
        </section>
      </Link>
      <div className="p-8">
        <Link href={"/drive"}>My Drive</Link>
        <CreateFolderButton parentFolderId={p.folderId as string} />
        <CreateFileButton parentFolderId={p.folderId as string} />
      </div>
    </aside>
  );
};

export default SideBar;
