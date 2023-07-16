'use client';

import { env } from '@drive/env.mjs';
import { useSearchParams } from 'next/navigation';
import { NextResponse, type NextRequest } from 'next/server';
import { useEffect } from 'react';

const Page = async () => {
  const searchParams = useSearchParams();
  // const cookieStore = cookies();

  // const state = cookieStore.get('authorization_state');

  // const authState = req.nextUrl.searchParams.get('state');

  // if (state?.value !== undefined && authState !== state?.value)
  //   return redirect(`${utils.getAppUrl()}`);

  // cookieStore.delete('authorization_state');
  useEffect(() => {
    async function main() {
      const result = await fetch(`${env.AUTH_URL}/oauth/token`, {
        method: 'POST',
        body: JSON.stringify({
          code: searchParams.get('code'),
        }),
      });

      console.log(await result.json());
    }
    main();
  }, []);

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
