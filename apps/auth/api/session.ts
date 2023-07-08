import { redis } from '@auth/clients';
import { UserSession } from '@auth/types/user';
import { randomBytes } from 'crypto';
import { createHash } from './hash';
import { cookies } from 'next/headers';

const EXPIRES = 86400;

type scope = 'name' | 'email';

export const createSession = async (email: string) => {
  const sessionId = Buffer.from(randomBytes(32)).toString('hex');
  const userId = createHash(email);
  await redis.json.set(`session:${sessionId}`, '.', {
    sessionId,
    userId,
  });
  await redis.sendCommand(['EXPIRE', `session:${sessionId}`, String(EXPIRES)]);
  return { userId, sessionId } as UserSession;
};

export const saveSession = (session: UserSession) => {
  return cookies().set('session', session.sessionId, {
    maxAge: EXPIRES,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    domain: 'google.com',
  });
};

export const getSession = async (sessionId: string) => {
  const result = (await redis.json.get(`session:${sessionId}`)) as unknown;
  return result as UserSession;
};

export const createAuthCode = async (userId: string, scopes: scope[]) => {
  const id = Buffer.from(randomBytes(16)).toString('hex');
  await redis.json.set(`authorization-code:${id}`, '.', { userId, scopes });
  await redis.sendCommand([
    'EXPIRE',
    `authorization-code:${id}`,
    String(60 * 5),
  ]);
  return { code: id };
};

export const verifyAuthCode = async (codeId: string, userId: string) => {
  const result = (await redis.json.get(
    `authorization-code:${codeId}`
  )) as unknown as { userId: string };
  if (!result || result?.userId !== userId) {
    return false;
  }
  return true;
};

export const checkSession = async () => {
  const sessionId = cookies().get('session')?.value as string;
  if (!sessionId) return null;
  const sessio = await getSession(sessionId);
  if (!sessio) return null;
  return sessio;
};
