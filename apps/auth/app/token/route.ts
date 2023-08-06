import { getToken, tradeAuthCodeToken } from '@auth/api/token';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import qs from 'qs';
import { verifyAuthCode } from '@auth/api/auth_code';
import { cookies } from 'next/headers';
import { env } from '@auth/env.mjs';

const falseCredentialsAction = () => {
  return NextResponse.json({ error: '401 Unauthorized' }, { status: 401 });
};

const dataSchema = z.object({
  client_id: z.string(),
  client_secret: z.string(),
  code: z.string(),
  grant_type: z.string(),
  redirect_uri: z.string().url(),
  state: z.string(),
});

export const POST = async (req: NextRequest) => {
  const queries = await req.text();
  const json = qs.parse(queries);

  const params = dataSchema.parse(json);
  const token = await getToken();
  if (!token) {
    return falseCredentialsAction();
  }

  const authCode = await verifyAuthCode(params.code, token?.sub as string);
  if (authCode === null) {
    return falseCredentialsAction();
  }

  const authToken = await tradeAuthCodeToken(
    params.code,
    token?.sub as string,
    authCode?.scope.split(',') as ('name' | 'email')[]
  );

  cookies().set('access_token', authToken, {
    domain: env.NODE_ENV === 'production' ? '.v-thomas.com' : 'localhost',
    secure: true,
    maxAge: 86_400_000,
  });
  return NextResponse.json({
    success: true,
    access_token: authToken,
  });
};
