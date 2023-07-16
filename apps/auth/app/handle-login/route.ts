import { getUser } from '@auth/api/user';
import { redirect } from 'next/navigation';
import { env } from '@auth/env.mjs';
import { verifyHash } from '@auth/api/hash';
import Link from 'next/link';
import { createToken, saveToken } from '@auth/api/token';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const falseCredentialsAction = () => {
  return NextResponse.json({ error: 'false credentials' });
};

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const POST = async (req: NextRequest) => {
  const json = await req.json();
  const body = await bodySchema.parse(json);
  const user = await getUser(body.email);
  if (user === null) return falseCredentialsAction();

  const passwordIsValid = await verifyHash(user.password, body.password);
  if (!passwordIsValid) return falseCredentialsAction();

  const token = await createToken(user.id, ['email', 'name']);
  console.log(token);

  saveToken(token);

  return NextResponse.json({
    success: true,
  });
};

