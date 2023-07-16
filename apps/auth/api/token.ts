import { redis } from '@auth/clients';
import { env } from '@auth/env.mjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { IAuthCode, deleteAuthCode } from './auth_code';

type TScope = 'email' | 'name';

export interface AccessToken {
  sub: string;
  jti: string;
  iat: number;
  exp: number;
  scopes: TScope[];
}

export const createToken = (userId: string, scopes: TScope[]) => {
  const date = new Date().getTime();

  const payload = {
    sub: userId,
    jti: crypto.randomUUID(),
    iat: date,
    exp: date + 86_400_000,
    scopes,
  };
  return jwt.sign(payload, env.AUTH_SIGN_KEY, { algorithm: 'HS512' });
};

export const createTokenHeaders = (accessToken: string) => {
  return {
    'Set-Cookie': `access_token=${accessToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
  };
};

export const getToken = async () => {
  const costore = cookies();
  const token = costore.get('access_token')?.value as string;
  if (!token) return null;

  const accessToken = jwt.verify(token, env.AUTH_SIGN_KEY);
  return accessToken as {
    sub: string;
    jti: string;
    iat: number;
    exp: number;
    scopes: TScope[];
  };
};

export const saveToken = (accessToken: string) => {
  const store = cookies();
  store.set('access_token', accessToken, {
    maxAge: 86_400,
    secure: true,
    httpOnly: true,
  });
};

export const tradeAuthCodeToken = async (
  authCode: string,
  userId: string,
  scopes: TScope[]
) => {
  const token = createToken(userId, scopes);
  await deleteAuthCode(authCode);
  return token;
};
