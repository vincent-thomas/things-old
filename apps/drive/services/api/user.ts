import { env } from "@drive/env.mjs";
import { type JwtPayload, default as jwt } from "jsonwebtoken";
import { getCachedUser } from "./cache";
import { cookies } from "next/headers";

const verifyToken = (token: string): JwtPayload | string | null => {
  try {
    return jwt.verify(token, env.AUTH_KEY);
  } catch (E) {
    return null;
  }
};

export const getUser = async (isServer = false) => {
  const token = cookies().get("access_token");
  if (!token) {
    return null;
  }
  const verifiedContent = verifyToken(token.value);

  if (!verifiedContent) {
    return null;
  }

  const user = await getCachedUser(verifiedContent.sub as string, isServer);

  if (!user) {
    return null;
  }

  return user;
};
