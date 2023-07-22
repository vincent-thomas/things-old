import { api } from '@drive/services/api';
import type { FC } from 'react';
import { LogoutButton } from '@drive/app/(public)/components/LogoutButton';
import { Avatar } from './avatar';

const Layout: FC<{
  children: React.ReactNode;
  filebar: React.ReactNode;
  sidebar: React.ReactNode;
}> = async ({ children, filebar, sidebar }) => {
  const user = await api.getUser();
  return (
    <div className="flex min-h-[100vh] min-w-[100vw]">
      {sidebar}
      <main className="w-[100%]">
        <nav className="align-center flex justify-end gap-4 bg-gray-200 px-4 py-2">
          <LogoutButton />
          <h2 className="font-bold">{user?.name}</h2>
          <Avatar userId={user?.id} />
          {/* <Image
            src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${user?.id}`}
            alt="user generated image"
            height={50}
            width={50}
          /> */}
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
