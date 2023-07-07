import { api } from "@/services/api";
import { LoginButton } from "./components/LoginButton";
import { SignInButton } from "./components/SignInButton";
import { utils } from "@/services/utils";

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
          <a href={`/oauth/logout?callback_url=${utils.getAppUrl()}`}>Logout</a>
          <a href={`/drive/root`}>Go to drive</a>
        </>
      )}
    </>
  );
};

export default page;
