import { db } from '@auth/db';
import { user } from '@auth/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthorizationHeader } from '@auth/api/authorization';
import { getToken } from '@auth/api/token';
import { cookies } from 'next/headers';
export const GET = async (req: NextRequest) => {
  const header = req.headers.get('authorization');
  const isVerifiedUser = verifyAuthorizationHeader(header as string);

  const token = await getToken();
  console.log(cookies().getAll());
  if (!isVerifiedUser || !token) {
    return NextResponse.json(
      { no: 'no' },
      {
        status: 401,
      }
    );
  }
  // TODO: User based secret

  const dbUser = await db.query.user.findFirst({
    where: eq(user.id, isVerifiedUser.sub),
    columns: {
      createdAt: true,
      email: isVerifiedUser.scope.includes('email'),
      name: isVerifiedUser.scope.includes('name'),
      id: true,
    },
  });

  return NextResponse.json(dbUser);
};
