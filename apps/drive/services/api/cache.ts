import type { User } from "@prisma/client";
import { c } from "../clients";

interface UserCache {
  email: string;
  id: string;
  name: string;
  encryptionKey: Buffer;
}

const KEY_ENCODING = "base64";

export const getCachedUser = async (
  userId: string,
  isServer: boolean
): Promise<UserCache | null> => {
  const userCache = (await c.redis.json.get(
    `user-session:${userId}`
  )) as unknown as Omit<UserCache, "encryptionKey"> & { encryptionKey: string };
  if (!userCache?.id) {
    return null;
  }
  return !isServer
    ? ({
        id: userCache.id,
        email: userCache.email,
        name: userCache.name,
      } as UserCache)
    : {
        ...userCache,
        encryptionKey: Buffer.from(userCache.encryptionKey, KEY_ENCODING),
      };
};

export const cacheUser = async (user: User) => {
  c.redis.json.set(`user-session:${user.id}`, ".", {
    email: user.email,
    id: user.id,
    name: user.name,
    encryptionKey: Buffer.from(user.encryption_key).toString(KEY_ENCODING),
  });
  await c.redis.sendCommand(["EXPIRE", `user-session:${user.id}`, "86400"]);
};
