import { createAuthCode } from '@auth/api/auth_code';
import { getToken } from '@auth/api/token';

import { redis } from '@auth/clients';
import { env } from '@auth/env.mjs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  callback_uri: z.string().url(),
  state: z.string().optional(),
  client_id: z.string(),
  scopes: z.string().transform((scopes) => {
    return scopes.split(',');
  }),
});
const scopesSchema = z.array(z.string().regex(/name|email/));

export const GET = async (req: NextRequest) => {
  const nextParams = req.nextUrl.searchParams;
  const pState = nextParams.get('state');
  const client_id = nextParams.get('client_id');
  const callback_uri = nextParams.get('callback_uri');
  const urlScopes = nextParams.get('scopes');

  const p = schema.safeParse({
    callback_uri,
    state: pState,
    client_id,
    scopes: urlScopes,
  });

  if (!p.success) {
    return NextResponse.json(p.error);
  }

  const {
    scopes: unvalidatedScopes,
    callback_uri: callback,
    client_id: clientId,
    state,
  } = p.data;
  const scopes = scopesSchema.parse(unvalidatedScopes) as ('name' | 'email')[];
  const token = await getToken();

  if (token === null) {
    const redirectUrl = new URL(`/oauth/login`, env.AUTH_APP_URL);
    redirectUrl.searchParams.set('callback_uri', callback);
    redirectUrl.searchParams.set('scopes', scopes.join(','));
    redirectUrl.searchParams.set('client_id', clientId);
    if (state) redirectUrl.searchParams.set('state', state);
    return NextResponse.redirect(redirectUrl.toString());
  }

  const code = await createAuthCode(token.sub, scopes);

  // const { code } = await createAuthCode(session.userId, scopes);

  const redirectUrl = new URL(callback);
  if (state) redirectUrl.searchParams.set('state', state);
  redirectUrl.searchParams.set('code', code);
  return NextResponse.redirect(redirectUrl.toString());
};
