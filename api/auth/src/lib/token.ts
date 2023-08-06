import jwt, { type JwtPayload } from 'jsonwebtoken';

export const validateToken = (token: string) =>
  jwt.verify(token, process.env['AUTH_SIGN_KEY'] as string) as JwtPayload;
