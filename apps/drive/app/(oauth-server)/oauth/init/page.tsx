import { c } from "@drive/services/clients";
import { cookies } from "next/headers";
import { createToken } from "../token/utils";
import type { ServerPage } from "@drive/types/page";
import { redirect } from "next/navigation";
import { createHash } from "../utils/hash";
import { randomBytes } from "crypto";
import { utils } from "@drive/services/utils";

const Page = ({ searchParams }: ServerPage) => {
  const Post = async (data: FormData) => {
    "use server";

    const email = data.get("email") as string;
    const name = data.get("name") as string;
    const password = data.get("password") as string;

    const checkExisting = await c.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (checkExisting !== null) {
      console.log("user already exists!");
      return;
    }
    const userKey = await createHash(password);
    const user = await c.prisma.user.create({
      data: {
        email,
        name,
        encryption_key: randomBytes(32),
        key: userKey,
      },
    });

    const token = createToken(user.id, ["user"], ["email", "name"]);

    cookies().set("access_token", token, {
      path: "/",
      maxAge: 86400,
      sameSite: "strict",
    });

    await c.redis.json.set(`user-session:${user.id}`, ".", {
      email: user.email,
      id: user.id,
      name: user.name,
    });

    const callback = searchParams.callback_url as string;
    const redirectURL = new URL(`${utils.getAppUrl()}/oauth/authorize`);

    redirectURL.searchParams.set("callback_url", callback);
    redirectURL.searchParams.set("state", searchParams.state as string);
    redirect(redirectURL.toString());
  };

  return (
    <>
      <form action={Post}>
        <input type="email" name="email" required />
        <input type="text" name="name" required />
        <input type="password" name="password" required />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default Page;
