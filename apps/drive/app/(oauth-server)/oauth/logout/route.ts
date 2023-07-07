import { utils } from "@/services/utils";
import { c } from "@/services/clients";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const store = cookies();
  const token = store.get("access_token");
  const data = jwt.decode(token?.value as string);

  store.delete("access_token");
  await c.redis.json.del(`user-session:${data?.sub as string}`);

  const params = req.nextUrl.searchParams;
  const callback = params.get("callback_url");

  if (callback) {
    return NextResponse.redirect(callback);
  }

  return utils.AResponse({ message: "Logged out" });
};
