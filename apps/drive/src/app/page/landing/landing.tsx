import { Button } from "@things/ui";
import { Link } from "react-router-dom";
import { useUser } from "../../providers/user";
import { Routes } from "../../routes";

function Landing(props: {}) {
  const user = useUser();
  if (user.loading) {
    return <>loading...</>;
  }

  return (
    <div>
      <h1>Welcome to Landing!</h1>
      {!user.authed ? (
        <Button variant="link" asChild>
          <a
            href={`http://localhost:8080/auth/google/authorize?redirect_uri=${
              import.meta.env.VITE_APP_URL
            }/callback/auth-code`}
          >
            log in
          </a>
        </Button>
      ) : (
        <Button asChild variant="link">
          <Link to={Routes.browse()}>go to protected</Link>
        </Button>
      )}
    </div>
  );
}

export default Landing;
