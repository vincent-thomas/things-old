import { env } from '@drive/env.mjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { uid } from 'uid';
export const GET = () => {
  const state = uid(20);
  cookies().set('authorization_state', state, {
    httpOnly: true,
  });
  return NextResponse.redirect(
    `${env.DRIVE_AUTH_URL}/oauth/authorize?redirect_uri=${encodeURIComponent(
      `${env.DRIVE_APP_URL}/callback`
    )}&state=${state}&client_id=&scope=email,name`
  );
};
