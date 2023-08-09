import { eq } from 'drizzle-orm';
import { db } from '../db/clients';
import { user } from '../db/schema';
import { createPasswordHash, verifyPasswordHash } from '@things/crypto';
import { uid } from 'uid/secure';


interface Flags {
  name: boolean;
  email: boolean;
}

export const getUser = async (userId: string, flags: Flags) => {
  const result = await db.query.user.findFirst({
    where: eq(user.id, userId),
    columns: {
      id: true,
      createdAt: true,
      updatedAt: true,
      email: flags.email,
      fullName: flags.name
    }
  });
  return result;
};

export const getUserByCredentials = async (email: string, pass: string) => {
  const result = await db.query.user.findFirst({
    where: eq(user.email, email),
  });
  if (!result) return null;

  if (!(await verifyPasswordHash(result?.password, pass))) return null;

  const {password: _, ...toReturn} = result;

  return toReturn;
};
export const createUser = async (email: string, name: string, pass: string) => {

  const hashPass = await createPasswordHash(pass);
const id = uid(14); 

  await db.insert(user).values({
    email,
    fullName: name,
    password: hashPass,
    id
  })
  return {email, fullName: name, id};
};

