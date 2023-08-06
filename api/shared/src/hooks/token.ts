import { Request } from 'express';
import { verify } from 'jsonwebtoken';

interface Token {
  sub: string;
  jti: string;
  iat: number;
  exp: number;
  scope: ('name' | 'email')[];
}

export const getToken = (req: Request, signKey?: string): Token => {
  const authHeader = req.headers?.authorization;

  const token = authHeader?.split(' ')[1];

  return verify(
    token as string,
    signKey || (process.env['AUTH_SIGN_KEY'] as string)
  ) as Token;
};
