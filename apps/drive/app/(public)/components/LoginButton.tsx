'use client';

import { loginAuthStateGen } from './loginHandler';
import { utils } from '@drive/services/utils';
import { getAuthUrl } from './authUrlHandler';

export const LoginButton = () => {
  return (
    <button
      onClick={async () => {
        const result = await loginAuthStateGen();
        const authUrl = await getAuthUrl();
        window.location.href = `${authUrl}/oauth/authorize?redirect_uri=${encodeURIComponent(
          `${utils.getAppUrl()}/callback`
        )}&state=${result.state}&client_id=&scope=email,name`;
      }}
    >
      Login
    </button>
  );
};
