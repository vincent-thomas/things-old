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
  const user = await getUser(body.email);

  if (user === null) return falseCredentialsAction();

  const passwordIsValid = await verifyHash(user.password, body.password);
  if (!passwordIsValid) return falseCredentialsAction();

  const token = createToken(user.id, ['email', 'name']);

  saveToken(token);

  return NextResponse.json({
    success: true,
  });
};
