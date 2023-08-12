import { Button } from '@things/ui';
import { Link } from 'react-router-dom';
import { useUser } from '../../providers/user';
import { Routes } from '../../routes';

/* eslint-disable-next-line */
interface LandingProps {}

function Landing(props: LandingProps) {
  const user = useUser();
  if (user.loading) {
    return <>loading...</>
  }

  return (
    <div>
      <h1>Welcome to Landing!</h1>
      {!user.authed ?       <Button variant="link" asChild>
        {/* @ts-ignore */}
        <a href={`http://localhost:8080/oauth/v1/authorize?redirect_uri=${import.meta.env.VITE_APP_URL}/callback/auth-code&state=test&client_id=drive_new&scope=email`}>
          log in
        </a>
      </Button> : <Button asChild variant="link">
        <Link to={Routes.browse()}>go to protected</Link></Button>}
    </div>

  );
}

export default Landing;
