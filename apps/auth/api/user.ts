import { redis } from '@auth/clients';
import { randomBytes } from 'crypto';
import { createHash, createKeyHash } from './hash';
import { User } from '@auth/types/user';

const KEY_ENCODING = 'base64';
export const createUser = async (
  email: string,
  name: string,
  password: string
) => {
  const userId = createHash(email);
  const encKey = randomBytes(32);
  const key = await createKeyHash(password);

  await redis.json.set(`account:${userId}`, '.', {
    email,
    id: userId,
    name,
    encryptionKey: Buffer.from(encKey).toString(KEY_ENCODING),
    key,
  });
  return {
    email,
    id: userId,
    name,
    encryptionKey: encKey,
    key,
  } as User;
};

export const getUser = async (email: string) => {
  return (await redis.json.get(
    `account:${createHash(email)}`
  )) as unknown as User;
};
