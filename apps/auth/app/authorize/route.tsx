import { checkSession, createAuthCode } from '@auth/api/session';
import { env } from '@auth/env.mjs';
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
  const nextParams = req.nextUrl.searchParams;
  const state = nextParams.get('state');
  const clientId = nextParams.get('client_id');
  const callbackUrl = nextParams.get('callback_uri');
  const urlScopes = nextParams.get('scopes');

  const p = schema.safeParse({
    callbackUrl,
    state,
    clientId,
    scopes: urlScopes,
  });

  if (!p.success) {
    return NextResponse.json(p.error);
  }

  const params = p.data;
  const scopes = scopesSchema.parse(params.scopes) as ('name' | 'email')[];
  const session = await checkSession();

  if (session === null) {
    const redirectUrl = new URL(`/oauth/login`, env.AUTH_APP_URL);
    redirectUrl.searchParams.set('callback_uri', params.callbackUrl);
    redirectUrl.searchParams.set('scopes', params.scopes.join(','));
    redirectUrl.searchParams.set('client_id', params.clientId);
    if (params.state) redirectUrl.searchParams.set('state', params.state);
    return NextResponse.redirect(redirectUrl.toString());
  }

  const { code } = await createAuthCode(session.userId, scopes);

  const redirectUrl = new URL(params.callbackUrl);
  if (params.state) redirectUrl.searchParams.set('state', params?.state);
  redirectUrl.searchParams.set('code', code);
  return NextResponse.redirect(redirectUrl.toString());
};
