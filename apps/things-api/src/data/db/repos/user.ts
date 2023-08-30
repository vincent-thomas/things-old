import { eq } from "drizzle-orm";
import { user } from "../schema";
import { db } from "../client";
import { redis } from "src/data/redis/client";

const ONE_WEEK_IN_SECONDS = 604_800;

export const upsertUser = async (
  data: Omit<Omit<typeof user.$inferSelect, "createdAt">, "updatedAt">
) => {
  const existingUser = await db.query.user.findFirst({
    where: eq(user.id, data.id)
  });

  if (existingUser) return existingUser;

  await db.insert(user).values({ ...data, createdAt: new Date() });
  const newUser = (await db.query.user.findFirst({
    where: eq(user.id, data.id)
  })) as typeof user.$inferSelect;

  await redis.json.set(`user-data:${newUser.id}`, ".", newUser);
  await redis.expire(`user-data:${newUser.id}`, ONE_WEEK_IN_SECONDS);
  return newUser;
};

export const getUser = async (
  userId: string
): Promise<typeof user.$inferSelect | null> => {
  const maybeFast = (await redis.json.get(`user-data:${userId}`)) as unknown as
    | typeof user.$inferSelect
    | null;
  if (maybeFast !== null) {
    return maybeFast;
  }

  const userFromDb = await db.query.user.findFirst({
    where: eq(user.id, userId)
  });

  if (userFromDb === undefined) {
    return null;
  }

  await redis.json.set(`user-data:${userFromDb.id}`, ".", userFromDb);
  await redis.expire(`user-data:${userFromDb.id}`, ONE_WEEK_IN_SECONDS);
  return userFromDb;
};

export const removeUser = async (userId: string) => {
  try {
    await db.delete(user).where(eq(user.id, userId));
    return { success: true };
  } catch (e) {
    console.trace(e);
    return { success: false };
  }
};
