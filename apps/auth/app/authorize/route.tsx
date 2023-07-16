import { createAuthCode } from '@auth/api/auth_code';
import { getToken } from '@auth/api/token';

import { env } from '@auth/env.mjs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  redirect_uri: z.string().url(),
  state: z.string().optional(),
  client_id: z.string(),
  scope: z.string().transform((scope) => {
    return scope.split(',');
  }),
  response_type: z.string().regex(/code/).default('code'),
});
const scopeSchema = z.array(z.string().regex(/name|email/));

export const GET = async (req: NextRequest) => {
  console.log('SEARC', req.nextUrl.search);
  const nextParams = req.nextUrl.searchParams;
  const pState = nextParams.get('state');
  const client_id = nextParams.get('client_id');
  const redirect_uri = nextParams.get('redirect_uri');
  const urlScopes = nextParams.get('scope');
  const respType = nextParams.get('response_type');

  const p = schema.safeParse({
    redirect_uri,
    state: pState,
    client_id,
    scope: urlScopes,
    response_type: respType === null ? undefined : respType,
  });
  if (!p.success) {
    return NextResponse.json(p.error);
  }

  const {
    scope: unvalidScope,
    redirect_uri: callback,
    client_id: clientId,
    state,
    response_type,
  } = p.data;

  const scope = scopeSchema.parse(unvalidScope) as ('name' | 'email')[];
  const token = await getToken();

  if (token === null) {
    const redirectUrl = new URL(`/oauth/login`, env.AUTH_APP_URL);
    redirectUrl.searchParams.set('redirect_uri', callback);
    redirectUrl.searchParams.set('scope', scope.join(','));
    redirectUrl.searchParams.set('client_id', clientId);
    redirectUrl.searchParams.set('response_type', response_type);
    if (state) redirectUrl.searchParams.set('state', state);
    return NextResponse.redirect(redirectUrl.toString());
  }
  const redirectUrl = new URL(callback);
  if (state) redirectUrl.searchParams.set('state', state);

  if (response_type === 'code') {
    const code = await createAuthCode(token.sub, scope);

    // const { code } = await createAuthCode(session.userId, scope);

    redirectUrl.searchParams.set('code', code);
  }
  return NextResponse.redirect(redirectUrl.toString());
};
