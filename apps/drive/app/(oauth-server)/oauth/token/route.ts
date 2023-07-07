import { type NextRequest } from "next/server";
import { createToken, createTokenHeaders } from "./utils";
import { c } from "@/services/clients";
import { utils } from "@/services/utils";
import { api } from "@/services/api";
import type { User } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  const { code: codeFromBody } = (await req.json()) as { code: string };
  const code = Buffer.from(codeFromBody, "base64").toString("utf8");
  const [userId, authCode] = code.split(":") as [string, string];
  const dbCode = await c.redis.get(`user:${userId}:auth_code`);

  if (dbCode === authCode) {
    const access_token = createToken(userId, ["user"], ["email"]);
    const user = await c.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    await api.cacheUser(user as User);

    await c.redis.sendCommand(["EXPIRE", `user:${userId}:auth_code`, "1"]);
    return utils.AResponse({ access_token }, null, {
      headers: createTokenHeaders(access_token),
    });
  }

  return utils.AResponse(null, { message: "Code is invalid" }, { status: 401 });
};
