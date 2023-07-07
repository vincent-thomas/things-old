import { utils } from "@/services/utils";
import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { api } from "@/services/api";

export const POST = async (req: NextRequest) => {
  const body = await req.text();
  const filename = req.nextUrl.searchParams.get("key") as string;
  const parentFolder = req.nextUrl.searchParams.get("parent_folder") as string;
  const fileType = req.nextUrl.searchParams.get("file_type") as string;

  const result = api.uploadFile(
    filename,
    fileType,
    parentFolder,
    Buffer.from(body, "utf-8")
  );

  revalidatePath(`/drive/[folderId]`);

  return utils.AResponse({ ...result, body: body });
};
