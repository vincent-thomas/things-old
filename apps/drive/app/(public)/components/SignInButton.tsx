'use client';

import { utils } from '@drive/services/utils';
import { useCallback, useState } from 'react';

export const SignInButton = () => {
  const [state, setState] = useState<string>();
  const genState = useCallback(() => {
    const newState = crypto.randomUUID();
    sessionStorage.setItem('auth_state', newState);
    return newState;
  }, []);

  return (
    <a
      onMouseOver={() => {
        setState(genState());
      }}
      href={`http://localhost:4200/signup?callback_url=${encodeURIComponent(
        `${utils.getAppUrl()}/callback&client_id=&client_secret=`
      )}&state=${state}`}
    >
      sign in
    </a>
  );
};
