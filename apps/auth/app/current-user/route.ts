import { db } from '@auth/db';
import { user } from '@auth/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { env } from '@auth/env.mjs';
import { AccessToken } from '@auth/api/token';
import { verifyAuthorizationHeader } from '@auth/api/authorization';
export const GET = async (req: NextRequest) => {
  const header = req.headers.get('authorization');
  const isVerifiedUser = verifyAuthorizationHeader(header as string);
  if (!isVerifiedUser) {
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
      email: isVerifiedUser.scopes.includes('email'),
      name: isVerifiedUser.scopes.includes('name'),
      id: true,
    },
  });
  console.log(dbUser);

  return NextResponse.json(dbUser);
};
