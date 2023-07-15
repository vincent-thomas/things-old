import { cookies } from 'next/headers';
import { redis } from '@auth/clients';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkSession, getSession, verifyAuthCode } from '@auth/api/session';
import { db } from '@auth/db';
import { user } from '@auth/db/schema';
import { eq } from 'drizzle-orm';

export const GET = async () => {
  const session = cookies().get('session')?.value;

  // const dbSession = await redis.json.get(`session:${session}`);

  // return NextResponse.json(dbSession);
};

const codeVerify = z.object({
  code: z.string(),
});

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { code } = codeVerify.parse(body);

  // const code = codeVerify.parse(req.nextUrl.searchParams.get('code'));
  const session = await checkSession();
  if (session === null) {
    return NextResponse.json('nooo');
  }
  const isReal = await verifyAuthCode(code, session.userId);

  if (!isReal) {
    return NextResponse.json('authcode cannot be verified');
  }
  // const scopes = isReal.scopes.split('_');
  // const currentUser = await db.query.user.findFirst({
  //   where: eq(user.id, isReal.userId),
  //   columns: {
  //     email: scopes.includes('email'),
  //     name: scopes.includes('name'),
  //     id: true,
  //     createdAt: true,
  //   },
  // });
  // console.log(isReal);
  return NextResponse.json('to be continue');
};
