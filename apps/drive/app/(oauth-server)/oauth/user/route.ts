import { env } from "@drive/env.mjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getTokens } from "./getTokens";
import { utils } from "@drive/services/utils";
import { c } from "@drive/services/clients";

export const GET = async () => {
  const store = cookies();
  const { accessToken } = getTokens(store);
  try {
    const data = jwt.verify(accessToken, env.AUTH_KEY) as JwtPayload;
    const stringUser = await c.redis.json.get(
      `user-session:${data.sub as string}`
    );
    return utils.AResponse(stringUser);
  } catch {
    return NextResponse.json({ verified: false });
  }
};
