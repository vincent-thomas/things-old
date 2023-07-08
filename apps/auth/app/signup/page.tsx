import { createUser, getUser } from '@auth/api/user';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const Page = ({ searchParams }: any) => {
  const Post = async (data: FormData) => {
    'use server';

    const email = data.get('email') as string;
    const name = data.get('name') as string;
    const password = data.get('password') as string;

    const checkExisting = await getUser(email);
    console.log(checkExisting);
    if (checkExisting !== null) {
      console.log('user already exists!');
      return;
    }
    const user = await createUser(email, name, password);
    console.log('USER', user);
    // const session = await createSession(user.id);
    // console.log('SESSION', session);

    // saveSession(session);
    console.log('RESULT', cookies().get('session'));
    const callback = searchParams.callback_url as string;
    const redirectURL = new URL(`${process.env.APP_URL}/authorize`);

    redirectURL.searchParams.set('callback_uri', callback);
    redirectURL.searchParams.set('state', searchParams.state as string);
    redirectURL.searchParams.set('client_id', searchParams.client_id as string);
    redirectURL.searchParams.set(
      'client_secret',
      searchParams.client_secret as string
    );
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
