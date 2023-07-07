import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";
import { c } from "@/services/clients";
import { api } from "@/services/api";
import { utils } from "@/services/utils";

export const GET = async (req: NextRequest) => {
  const state = req.cookies.get("authorization_state");

  const cookieStore = cookies();
  const storedState = cookieStore.get("authorization_state");

  if (state?.value !== undefined && state.value !== storedState?.value)
    return redirect(`${utils.getAppUrl()}`);

  const result = await axios.post(`${utils.getAppUrl()}/oauth/token`, {
    code: req.nextUrl.searchParams.get("code"),
  });

  if (result.data.status === "success") {
    cookieStore.delete("authorization_state");
    const user = await api.getUser();
    await c.prisma.folder
      .create({
        data: {
          key: "root",
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      })
      .catch();
    return NextResponse.redirect(`${utils.getAppUrl()}/drive`, 308);
  }
  return utils.AResponse(
    null,
    { error: "something happended" },
    {
      status: 401,
    }
  );
};
