'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getAuthUrl } from '../../(public)/components/authUrlHandler';
import qs from 'qs';
const Page = () => {
  const searchParams = useSearchParams();
  // const cookieStore = cookies();

  // const state = cookieStore.get('authorization_state');

  // const authState = req.nextUrl.searchParams.get('state');

  // if (state?.value !== undefined && authState !== state?.value)
  //   return redirect(`${utils.getAppUrl()}`);

  // cookieStore.delete('authorization_state');
  useEffect(() => {
    async function main() {
      const result = await fetch(`${await getAuthUrl()}/oauth/token`, {
        method: 'POST',
        body: qs.stringify({
          code: searchParams.get('code'),
          client_secret: 'drive',
          client_id: 'drive',
        }),
        credentials: 'include',
      });

      console.log(await result.json());
    }
    main();
  }, [searchParams]);

  return <>loading...</>;

  // if (result.data.status === 'success') {
  //   const user = await api.getUser();
  //   await c.prisma.folder
  //     .create({
  //       data: {
  //         key: 'root',
  //         user: {
  //           connect: {
  //             id: user?.id,
  //           },
  //         },
  //       },
  //     })
  //     .catch();
  // return NextResponse.redirect(`${utils.getAppUrl()}/drive`, 308);
  // return utils.AResponse(
  //   null,
  //   { error: 'something happended' },
  //   {
  //     status: 401,
  //   }
  // );
};

export default Page;
