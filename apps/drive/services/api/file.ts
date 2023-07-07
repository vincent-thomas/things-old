import { c } from "@/services/clients";
import { api } from ".";
import { NextResponse } from "next/server";
import { utils } from "../utils";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { decrypt, encrypt } from "../cryptography";
import { env } from "@/env.mjs";
const streamToString = (stream: NodeJS.ReadableStream): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
export const uploadFile = async (
  filename: string,
  fileType: string,
  parentFolderId: string,
  body: Buffer
) => {
  const user = await api.getUser(true);

  const dbParentFolder = await c.prisma.folder.findFirst({
    where: {
      id: parentFolderId === "root" ? undefined : parentFolderId,
      key: parentFolderId !== "root" ? undefined : parentFolderId,
      userId: user?.id,
    },
  });

  if (!dbParentFolder) {
    return NextResponse.json({ error: "folder not exist" }, { status: 400 });
  }

  if (!user?.id) {
    return utils.AResponse("no");
  }

  const f = await c.prisma.file.create({
    data: {
      filename,
      fileSize: 0,
      fileType,
      ownedById: user?.id as string,
      parentFolder: {
        connect: {
          id: dbParentFolder.id,
        },
      },
    },
  });

  const createFile = new PutObjectCommand({
    Key: `${user?.id as string}/${f.id}`,
    Body: Buffer.from(
      encrypt(Buffer.from(body).toString("utf-8"), user.encryptionKey),
      "utf-8"
    ),
    Bucket: env.S3_FILES_BUCKET,
  });

  const result = await c.s3.send(createFile);
  return result;
};

export const getFile = async (
  fileId: string,
  userId: string,
  encryptionKey: Buffer
) => {
  const file = await c.prisma.file.findUnique({
    where: {
      id: fileId,
    },
  });
  if (file?.ownedById !== userId) return null;

  const fileGot = new GetObjectCommand({
    Bucket: env.S3_FILES_BUCKET,
    Key: `${userId}/${file?.id}`,
  });

  const s3File = await c.s3.send(fileGot);

  const bodyString = Buffer.from(
    await streamToString(s3File.Body as NodeJS.ReadableStream)
  ).toString("utf-8");

  return { ...file, body: decrypt(bodyString, encryptionKey) };
};
