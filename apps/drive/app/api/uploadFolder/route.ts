import { utils } from "@/services/utils";
import { c } from "@/services/clients";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { api } from "@/services/api";
import { revalidatePath } from "next/cache";
const schema = z.object({
  key: z.string().min(1),
  parentFolderId: z.string().uuid().nullish().default(null).optional(),
  root: z.boolean().default(false),
});

export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  const parse = schema.safeParse(body);
  if (!parse.success) return utils.AResponse(null, "formatting");
  const user = await api.getUser();
  if (!user) {
    return utils.AResponse(null, user);
  }

  const existingFolder = await c.prisma.folder.findFirst({
    where: {
      key: parse.data.key,
      userId: user?.id,
      parentFolderId: parse.data.parentFolderId || null,
    },
  });

  if (parse.data.parentFolderId !== null && !!existingFolder) {
    return utils.AResponse(null, "existing");
  }

  const rootFolder = await api.getRootFolderId();
  const folder = await api.createFolder(
    parse.data.key,
    user?.id as string,
    parse.data.root ? rootFolder : (parse.data.parentFolderId as string)
  );
  revalidatePath(`/drive/[folderId]`);

  return utils.AResponse(folder);
};
