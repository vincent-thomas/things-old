import { cookies } from 'next/headers';
import { redis } from '@auth/clients';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession, verifyAuthCode } from '@auth/api/session';

export const GET = async () => {
  const session = cookies().get('session')?.value;

  const dbSession = await redis.json.get(`session:${session}`);

  return NextResponse.json(dbSession);
};

const codeVerify = z.object({
  code: z.string(),
});

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { code } = codeVerify.parse(body);

  // const code = codeVerify.parse(req.nextUrl.searchParams.get('code'));
  const sessionId = cookies().get('session');
  const session = await getSession(sessionId?.value as string);
  const isReal = verifyAuthCode(code, session.userId);
  console.log(isReal);
  return NextResponse.json('test');
};
