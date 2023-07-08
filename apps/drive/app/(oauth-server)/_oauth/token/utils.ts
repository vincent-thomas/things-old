import { env } from '@drive/env.mjs';
import jwt from 'jsonwebtoken';

type TScope = 'email' | 'name';

export const createToken = (
  userId: string,
  roles: string[],
  scopes: TScope[]
) => {
  const date = new Date().getTime();

  const payload = {
    sub: userId,
    jti: crypto.randomUUID(),
    iat: date,
    exp: date + 86_400_000,
    aud: 'client',
    data: {
      roles,
      scopes,
    },
  };
  return jwt.sign(payload, 'test', { algorithm: 'HS512' });
};

export const createTokenHeaders = (accessToken: string) => {
  return {
    'Set-Cookie': `access_token=${accessToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
  };
};
