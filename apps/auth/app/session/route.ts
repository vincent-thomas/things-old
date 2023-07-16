import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkSession, getSession, verifyAuthCode } from '@auth/api/session';

export const GET = async () => {
  const sessionId = cookies().get('session')?.value as string;
  const session = await getSession(sessionId);

  return NextResponse.json(session);
};

const codeVerify = z.object({
  code: z.string(),
});

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { code } = codeVerify.parse(body);

  const session = await checkSession();
  if (session === null) {
    return NextResponse.json('nooo');
  }
  const isReal = await verifyAuthCode(code, session.userId);

  if (!isReal) {
    return NextResponse.json('authcode cannot be verified');
  }
  const scopes = isReal.scopes.split('_');
  return NextResponse.json('to be continue');
};
