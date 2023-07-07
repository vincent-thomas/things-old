import { utils } from "@drive/services/utils";
import { api } from "@drive/services/api";
import { c } from "@drive/services/clients";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@drive/env.mjs";

const schema = z.object({
  fileId: z.string().uuid(),
});

export const POST = async (req: NextRequest) => {
  const reqBody = await req.json();

  const body = schema.safeParse(reqBody);

  if (!body.success) return utils.AResponse(null, { no: "no" });

  const { data } = body;

  const user = await api.getUser();

  const dbFile = await c.prisma.file.findUnique({
    where: {
      id: data.fileId,
    },
  });

  if (dbFile?.ownedById !== user?.id)
    return utils.AResponse(null, "not authed");
  if (!dbFile)
    return NextResponse.json({ error: "file not exist" }, { status: 400 });

  const deleteFileCmd = new DeleteObjectCommand({
    Key: `${user?.id}/${data.fileId}`,
    Bucket: env.S3_FILES_BUCKET,
  });
  await c.s3.send(deleteFileCmd);
  revalidatePath(`/drive/[folderId]`);

  return utils.AResponse({ ok: true });
};
