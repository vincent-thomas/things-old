import { getSession } from '@auth/sdk';
import { c } from '@drive/services/clients';
import { cookies } from 'next/headers';

const Page = async () => {
  const sessionId = cookies().get('session');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const result = await getSession(c.redis, sessionId.value as string);
  return <>{JSON.stringify(result)}</>;
};

export default Page;
