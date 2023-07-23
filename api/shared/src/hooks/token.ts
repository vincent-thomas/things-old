import { Request } from 'express';
import { verify, decode } from 'jsonwebtoken';

interface Token {
  sub: string;
  jti: string;
  iat: number;
  exp: number;
  scope: ('name' | 'email')[];
}

export const getToken = (req: Request): Token => {
  const authHeader = req.headers?.authorization;

  const token = authHeader!.split(' ')[1];

  return decode(token) as Token;
};
export const getVerifiedToken = (token: string) => {
  try {
    return verify(token, process.env['AUTH_SIGN_KEY'] as string);
  } catch {
    return null;
  }
};
