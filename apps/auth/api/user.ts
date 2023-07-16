import { randomUUID } from 'crypto';
import { createKeyHash } from './hash';
import { db } from '@auth/db';
import { eq } from 'drizzle-orm';
import { user } from '@auth/db/schema';
import { uid } from 'uid/secure';
export const createUser = async (
  email: string,
  name: string,
  password: string
) => {
  const userId = randomUUID();
  const encryptionKey = uid(32);
  const key = await createKeyHash(password);

  await db.insert(user).values({
    id: userId,
    email,
    name,
    encryptionKey,
    password: key,
  });

  return { userId };
};

export const getUser = async (email: string) => {
  const existingUser = await db.query.user.findFirst({
    where: eq(user.email, email),
  });
  if (!existingUser) return null;
  return existingUser;
};
