import { Button } from '@things/ui';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { useUser } from '../../providers/user';

/* eslint-disable-next-line */
export interface LandingProps {}


export function Landing(props: LandingProps) {
  const user = useUser();

  if (user.loading) {
    return <>loading...</>
  }

  return (
    <div>
      <h1>Welcome to Landing!</h1>
      {!user.authed ?       <Button variant="link" asChild>
        <a href={`http://localhost:8080/oauth/v1/authorize?redirect_uri=${import.meta.env.VITE_APP_URL}/callback/auth-code&state=test&client_id=drive_new&scope=email`}>
          log in
        </a>
      </Button> : <Button>go to protected</Button>}

    </div>
  );
}

export default Landing;
