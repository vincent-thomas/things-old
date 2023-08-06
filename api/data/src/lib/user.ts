import { eq } from 'drizzle-orm';
import { db } from '../db/clients';
import { user } from '../db/schema';

export const getUser = async (userId: string) => {
  const result = await db.query.user.findFirst({
    where: eq(user.id, userId),
  });
  return result;
};
