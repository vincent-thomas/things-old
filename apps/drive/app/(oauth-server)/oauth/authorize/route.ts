import { c } from "@drive/services/clients";
import { randomUUID } from "crypto";
import { type NextRequest, NextResponse } from "next/server";
import { api } from "@drive/services/api";
import { utils } from "@drive/services/utils";

export const GET = async (req: NextRequest) => {
  const callback = decodeURIComponent(
    req.nextUrl.searchParams.get("callback_url") as string
  );
  const state = decodeURIComponent(req.nextUrl.searchParams.get("state") || "");
  const user = await api.getUser();

  if (!user) {
    return NextResponse.redirect(
      `${utils.getAppUrl()}/oauth/login?callback_url=${encodeURIComponent(
        callback
      )}&state=${state}`
    );
  }

  const code = randomUUID();

  await c.redis.set(`user:${user.id}:auth_code`, code);
  await c.redis.sendCommand([
    "EXPIRE",
    `user:${user.id}:auth_code`,
    String(30),
  ]);

  const authCode = Buffer.from(`${user.id}:${code}`).toString("base64");
  const url = new URL(callback);

  url.searchParams.set("code", authCode);
  url.searchParams.set("state", state);

  return NextResponse.redirect(url.toString());
};
