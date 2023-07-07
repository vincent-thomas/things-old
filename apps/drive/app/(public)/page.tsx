import { api } from "@drive/services/api";
import { LoginButton } from "./components/LoginButton";
import { SignInButton } from "./components/SignInButton";
import { LogoutButton } from "./components/LogoutButton";

const page = async () => {
  const user = await api.getUser();

  return (
    <>
      {JSON.stringify(user)}
      {!user ? (
        <>
          <LoginButton />
          <SignInButton />
        </>
      ) : (
        <>
        <LogoutButton />
          <a href={`/drive/root`}>Go to drive</a>
        </>
      )}
    </>
  );
};

export default page;
