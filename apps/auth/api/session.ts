import { db } from '@auth/db';
import { UserSession } from '@auth/types/user';
import { session, authCode } from '@auth/db/schema';
import { cookies } from 'next/headers';
import { eq } from 'drizzle-orm';
import { uid } from 'uid/secure';
import jwt from 'jsonwebtoken';
import { env } from '@auth/env.mjs';
import { redis } from '@auth/clients';

const EXPIRES = 86400;

type scope = 'name' | 'email';

export const createSession = async (userId: string) => {
  const sessionId = uid(32);

  const createdAt = new Date();
  const expires = new Date(createdAt.getTime() + 86_400_000);
  await db.insert(session).values({
    sessionId,
    userId,
    createdAt,
    expires,
  });
  return { userId, sessionId, createdAt } satisfies UserSession;
};

export const saveSession = (session: UserSession) => {
  return cookies().set('session', session.sessionId, {
    maxAge: EXPIRES,
    httpOnly: true,
    sameSite: true,
    // sameSite: 'strict',
  });
};

export const getSession = async (sessionId: string) => {
  const tes = await db.query.session.findFirst({
    where: eq(session.sessionId, sessionId),
    with: {
      user: {
        columns: {
          createdAt: true,
          email: true,
        },
      },
    },
  });
  return tes;
};

export const removeSession = async (sessionId: string) => {
  return await db.delete(session).where(eq(session.sessionId, sessionId));
};

export const createAuthCode = async (userId: string, scopes: scope[]) => {
  const code = uid(32);
  const data = {
    code,
    userId,
    scopes: scopes.join(','),
    createdAt: new Date(),
    expires: new Date(new Date().getTime() + 300_000),
  };
  const key = 'auth_code:' + userId;

  redis.json.set(key, '.', data);
  redis.sendCommand(['EXPIRE', key, '300']);

  return data;
};

export const verifyAuthCode = async (code: string, userId: string) => {
  const codee = await db.query.authCode.findFirst({
    where: eq(authCode.code, code),
  });
  if (!codee || codee?.userId !== userId) {
    return false;
  }
  return codee;
};

export const checkSession = async () => {
  const costore = cookies();
  const sessionId = costore.get('session')?.value as string;
  if (!sessionId) return null;

  const sessio = await getSession(sessionId);
  const valid = new Date().getTime() < sessio?.expires.getTime();
  if (!sessio) {
    costore.delete('session');
    return null;
  }
  if (!valid) {
    // await removeSession(sessio.sessionId);
    costore.delete('session');
    return null;
  }
  return sessio satisfies UserSession;
};
