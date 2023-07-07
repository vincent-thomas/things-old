import { c } from "@drive/services/clients";
import { redirect } from "next/navigation";
import { verifyHash } from "../utils/hash";
import { cookies } from "next/headers";
import { createToken } from "../token/utils";
import type { ServerPage } from "@drive/types/page";
import { utils } from "@drive/services/utils";
import { api } from "@drive/services/api";

const Login = ({ searchParams }: ServerPage) => {
  async function submit(e: FormData) {
    "use server";

    const email = e.get("email") as string;
    const password = e.get("password") as string;

    const user = await c.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      redirect("/");
    }

    const isPasswordCorrect = await verifyHash(user?.key, password);
    if (!isPasswordCorrect) redirect("/");

    const token = createToken(user.id, ["user"], ["email", "name"]);

    cookies().set("access_token", token, {
      path: "/",
      maxAge: 86400,
      sameSite: "strict",
    });

    api.cacheUser(user);

    redirect(
      `${utils.getAppUrl()}/oauth/authorize?callback_url=${
        searchParams.callback_url
      }&state=${searchParams.state}`
    );
  }

  return (
    <form action={submit}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">submit</button>
    </form>
  );
};

export default Login;
