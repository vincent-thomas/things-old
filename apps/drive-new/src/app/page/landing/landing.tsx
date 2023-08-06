import { Button } from '@things/ui';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import qs from 'qs';

/* eslint-disable-next-line */
export interface LandingProps {}

const checkIsLoggedIn = async () => {
  try {
    const result = await fetch('http://localhost:5000/oauth/current-user');
    const data = await result.json();
    return !(data?.no === 'no');
  } catch {
    console.log('eeror');
    return false;
  }
};

export function Landing(props: LandingProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [getP, setP] = useSearchParams();
  useEffect(() => {
    async function main() {
      const code = getP.get('code');
      const isLogged = await checkIsLoggedIn();
      console.log('code');
      setIsLoggedIn(!!code && isLogged);
      if (!isLoggedIn) {
        console.log(code);
        const body = qs.stringify({
          client_id: 'client',
          client_secret: 'client',
          code,
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:3000/testing',
          state: getP.get('state'),
        });
        const result = await fetch('http://localhost:5000/oauth/token', {
          method: 'POST',
          body,
          credentials: 'include',
        });
        const token = await result.json();
        if (token?.error) {
          setP(() => ({}));
        }

        const userRep = await checkIsLoggedIn();
        console.log(userRep);
        // console.log(getP.get('state'));
      }
    }
    main();
  }, []);
  return (
    <div>
      <h1>Welcome to Landing!</h1>
      <Button variant="link" asChild>
        <a href="http://localhost:5000/oauth/authorize?redirect_uri=http://localhost:4200&state=test&client_id=drive_new&scope=email">
          log in
        </a>
      </Button>
    </div>
  );
}

export default Landing;
