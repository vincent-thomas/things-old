import { and, eq } from 'drizzle-orm';
import { db } from '../db/clients';
import { user } from '../db/schema';
import { verifyPasswordHash } from '@things/crypto';

export const getUser = async (userId: string) => {
  const result = await db.query.user.findFirst({
    where: eq(user.id, userId),
  });
  return result;
};

export const getUserByCredentials = async (email: string, pass: string) => {
  const result = await db.query.user.findFirst({
    where: eq(user.email, email),
  });
  if (!result) return null;

  if (!(await verifyPasswordHash(result?.password, pass))) return null;

  const {password, ...toReturn} = result;

  return toReturn;
};
