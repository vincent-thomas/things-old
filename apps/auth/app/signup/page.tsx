import { createUser, getUser } from '@auth/api/user';
import { redirect } from 'next/navigation';
import { createSession, saveSession } from '@auth/api/session';
import { env } from '@auth/env.mjs';
import { createToken, saveToken } from '@auth/api/token';

const Page = ({ searchParams }: any) => {
  const Post = async (data: FormData) => {
    'use server';
    const email = data.get('email') as string;
    const name = data.get('name') as string;
    const password = data.get('password') as string;
    console.log(email);
    const checkExisting = await getUser(email);
    if (checkExisting !== null) {
      console.log('user already exists!');
      return;
    }
    const { userId } = await createUser(email, name, password);
    // // console.log('USER', user);
    const session = createToken(userId, ['email', 'name']);
    saveToken(session);
    // console.log('RESULT', cookies().get('session'));
    const callback = searchParams.redirect_uri as string;
    const redirectURL = new URL(`${env.AUTH_APP_URL}/oauth/authorize`);
    redirectURL.searchParams.set('redirect_uri', callback);
    redirectURL.searchParams.set('state', searchParams.state as string);
    redirectURL.searchParams.set('client_id', searchParams.client_id as string);
    redirectURL.searchParams.set('scope', searchParams.scope as string);
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
