import { checkSession, createAuthCode } from '@auth/api/session';
import { redis } from '@auth/clients';
import { env } from '@auth/env.mjs';
import { User } from '@auth/types/user';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  callbackUrl: z.string().url(),
  state: z.string().optional(),
  clientId: z.string(),
  scopes: z.string().transform((scopes) => {
    return scopes.split(',');
  }),
});
const scopesSchema = z.array(z.string().regex(/name|email/));

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const state = params.get('state');
  const clientId = params.get('client_id');
  const callbackUrl = params.get('callback_uri');
  const urlScopes = params.get('scopes');

  const p = schema.parse({
    callbackUrl,
    state,
    clientId,
    scopes: urlScopes,
  });

  const scopes = scopesSchema.parse(p.scopes) as ('name' | 'email')[];
  const session = await checkSession();

  if (session === null) {
    const redirectUrl = new URL(`/oauth/login`, env.AUTH_APP_URL);
    redirectUrl.searchParams.set('callback_uri', p.callbackUrl);
    redirectUrl.searchParams.set('scopes', p.scopes.join(','));
    redirectUrl.searchParams.set('client_id', p.clientId);
    if (p.state) redirectUrl.searchParams.set('state', p.state);
    return NextResponse.redirect(redirectUrl.toString());
  }

  // // TODO: Implement comfirming of scopes
  // const user = (await redis.json.get(
  //   `account:${session.userId}`
  // )) as unknown as User;

  const { code } = await createAuthCode(session.userId, scopes);

  const redirectUrl = new URL(p.callbackUrl);
  if (p.state) redirectUrl.searchParams.set('state', p.state);
  redirectUrl.searchParams.set('code', code);
  return NextResponse.redirect(redirectUrl.toString());
};
