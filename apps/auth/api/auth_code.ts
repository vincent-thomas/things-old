import { redis } from '@auth/clients';
import { uid } from 'uid/secure';

export interface IAuthCode {
  userId: string;
  scopes: string;
  createdAt: Date;
  expires: Date;
}

export const createAuthCode = async (
  userId: string,
  scopes: ('email' | 'name')[]
) => {
  const code = uid(32);
  const data = {
    userId,
    scopes: scopes.join(','),
    createdAt: new Date(),
    expires: new Date(new Date().getTime() + 300_000),
  } satisfies IAuthCode;

  const KEY = `auth_code:${code}`;

  redis.json.set(KEY, '.', data);
  redis.sendCommand(['EXPIRE', KEY, '300']);

  return code;
};

export const deleteAuthCode = async (codeId: string) => {
  redis.json.del(`auth_code:${codeId}`);
};

export const verifyAuthCode = async (
  code: string,
  userId: string
): Promise<null | IAuthCode> => {
  const authCode = (await redis.json.get(
    `auth_code:${code}`
  )) as unknown as IAuthCode;
  if (authCode.userId !== userId && authCode === null) {
    return null;
  }

  return authCode;
};
