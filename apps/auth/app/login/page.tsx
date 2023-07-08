import { cookies } from 'next/headers';
import { createHash, verifyHash } from '@auth/api/hash';
import { redis } from '@auth/clients';
import { getUser } from '@auth/api/user';
import { createSession, saveSession } from '@auth/api/session';
import { redirect } from 'next/navigation';

const Login = ({ searchParams }: any) => {
  const sessionId = cookies().get('session')?.value;
  const redirectUrl = new URL('/login', process.env.APP_URL as string);
  redirectUrl.searchParams.set('callback_uri', searchParams.callbackUrl);
  redirectUrl.searchParams.set('scopes', searchParams.scopes);
  redirectUrl.searchParams.set('client_id', searchParams.clientId);
  if (searchParams.state)
    redirectUrl.searchParams.set('state', searchParams.state);
  if (sessionId) {
    // return NextResponse.json('not logged in');
    // return NextResponse.redirect(redirectUrl.toString());
  }

  const action = async (data: FormData) => {
    'use server';
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    const user = await getUser(email);

    const passwordIsGood = await verifyHash(user?.key, password);

    if (!user || !passwordIsGood) {
      // TODO: Error handling
      return;
    }
    const session = await createSession(email);

    saveSession(session);
    const redirectUrl = new URL(
      '/oauth/authorize',
      process.env.APP_URL as string
    );
    redirectUrl.searchParams.set('callback_uri', searchParams.callback_uri);
    redirectUrl.searchParams.set('scopes', searchParams.scopes);
    redirectUrl.searchParams.set('client_id', searchParams.client_id);
    if (searchParams.state)
      redirectUrl.searchParams.set('state', searchParams.state);

    redirect(redirectUrl.toString());
    // throw new Error("doesn't exist");
  };

  return (
    <form action={action}>
      <input type="text" name="email" />
      <input type="password" name="password" />
      <button type="submit">submit</button>
    </form>
  );
  // const { handleSubmit, register } = useForm();
  // const p = useSearchParams();
  // const [isPending, startTransition] = useTransition();

  // const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
  //   startTransition(async () => {
  //     const result = await submitLogin({
  //       email,
  //       password,
  //       clientId: p.get('client_id') as string,
  //       clientSecret: p.get('client_secret') as string,
  //       callbackUrl: p.get('callback_uri') as string,
  //       state: p.get('state') as string,
  //     });
  //     console.log(result);
  //   });
  // };
};

export default Login;
