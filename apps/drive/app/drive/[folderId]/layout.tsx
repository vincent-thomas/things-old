import { api } from "@/services/api";
import type { FC } from "react";
import Image from "next/image";
import { utils } from "@/services/utils";

const Layout = async ({
  children,
  filebar,
  sidebar,
}: {
  children: React.ReactNode;
  filebar: React.ReactNode;
  sidebar: React.ReactNode;
}) => {
  const user = await api.getUser();
  return (
    <div className="flex min-h-[100vh] min-w-[100vw]">
      {sidebar}
      <main className="w-[100%]">
        <nav className="align-center flex justify-end gap-4 bg-gray-200 px-4 py-2">
          <a href={`/oauth/logout?callback_url=${utils.getAppUrl()}`}>Logout</a>
          <h2 className="">{user?.name}</h2>
          <Image
            src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${user?.id}`}
            alt="user generated image"
            height={50}
            width={50}
          />
        </nav>
        <div className="min-h-[100%]">
          {filebar}
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
