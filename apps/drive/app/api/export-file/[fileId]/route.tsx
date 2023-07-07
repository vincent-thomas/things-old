import { api } from "@drive/services/api";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { fileId: string } }
) => {
  const { fileId } = params;
  const user = await api.getUser(true);
  if (!user) {
    return NextResponse.json(
      { error: "user does not have access to this resource" },
      {
        status: 401,
      }
    );
  }

  try {
    const file = await api.getFile(
      fileId,
      user?.id as string,
      user.encryptionKey
    );

    return new Response(file?.body, {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { no: "no" },
      {
        status: 400,
      }
    );
  }
};
