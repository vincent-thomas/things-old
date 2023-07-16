import { getUser } from '@auth/api/user';
import { verifyHash } from '@auth/api/hash';
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
  const body = bodySchema.parse(json);
  console.log('test 1');
  const user = await getUser(body.email);
  console.log('test 2');

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
