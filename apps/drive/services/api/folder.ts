import { getUser } from "@drive/services/api/user";
import { c } from "@drive/services/clients";

export const getFolderContent = async (userId: string, folderId: string) => {
  const files = await c.prisma.file.findMany({
    where: {
      ownedById: userId,
      folderId,
    },
  });
  const folders = await c.prisma.folder.findMany({
    where: {
      userId,
      parentFolderId: folderId,
    },
  });
  return { files, folders };
};

export const getFolder = async (userId: string, folderId?: string) => {
  return await c.prisma.folder.findFirst({
    where: {
      id: folderId !== "root" ? folderId : undefined,
      key: folderId === "root" ? folderId : undefined,
      userId,
    },
    include: {
      parentFolder: true,
    },
  });
};

export const createFolder = (
  folderKey: string,
  userId: string,
  parentFolderId: string
) => {
  return c.prisma.folder.create({
    data: {
      key: folderKey,
      user: {
        connect: {
          id: userId,
        },
      },
      parentFolder: {
        connect: {
          id: parentFolderId,
        },
      },
    },
  });
};

export const getRootFolderId: () => Promise<string> = async () => {
  const user = await getUser();

  const cachedRootFolder = await c.redis.get(`root-folder:${user?.id}`);

  if (cachedRootFolder) return cachedRootFolder;

  const root = await c.prisma.folder.findFirst({
    where: {
      user: {
        id: user?.id,
      },
      key: "root",
      parentFolderId: null,
    },
  });
  await c.redis.set(`root-folder:${user?.id}`, root?.id as string);
  return root?.id as string;
};
