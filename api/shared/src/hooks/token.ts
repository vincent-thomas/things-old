import { Request } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { env } from '../env';

interface Token {
  sub: string;
  jti: string;
  iat: number;
  exp: number;
  scope: string;
}

export const getToken = (req: Request): Token => {
  const authHeader = req.headers?.authorization;

  const token = authHeader?.split(' ')[1];
  return validateToken(token as string) as Token; 
};
export const validateToken = (token: string) => {
  try {
    const value = verify(token, env.getEnv("signKey")) as Token;
    return value;
  } catch (e) {
    console.log(e)
    return null;
  }
}