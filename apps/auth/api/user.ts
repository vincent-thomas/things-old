import { redis } from '@auth/clients';
import { randomBytes, randomUUID } from 'crypto';
import { createHash, createKeyHash } from './hash';
import { User } from '@auth/types/user';
import { db } from '@auth/db';
import { eq } from 'drizzle-orm';
import { user } from '@auth/db/schema';
import { uid } from 'uid/secure';
const KEY_ENCODING = 'base64';
export const createUser = async (
  email: string,
  name: string,
  password: string
) => {
  const userId = randomUUID();
  const encryptionKey = uid(32);
  const key = await createKeyHash(password);

  const test = await db.insert(user).values({
    id: userId,
    email,
    name,
    encryptionKey,
    password: key,
  });

  console.log('YUSER', test);

  // await redis.json.set(`account:${userId}`, '.', {
  //   email,
  //   id: userId,
  //   name,
  //   encryptionKey: Buffer.from(encKey).toString(KEY_ENCODING),
  //   key,
  // });
  // return {
  //   email,
  //   id: userId,
  //   name,
  //   encryptionKey: encKey,
  //   key,
  // } as User;
};

export const getUser = async (email: string) => {
  const existingUser = await db.query.user.findFirst({
    where: eq(user.email, email),
  });

  if (!existingUser) {
    return null;
  }

  return existingUser;
  // return (await redis.json.get(
  //   `account:${createHash(email)}`
  // )) as unknown as User;
};
