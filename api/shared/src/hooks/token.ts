import { Request } from 'express';
import { verify, decode } from 'jsonwebtoken';

export const getToken = (req: Request, isDecoded = true) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader) {
    return null;
  }
  const [type, token] = authHeader.split(' ');
  if (type.toLowerCase() !== 'bearer') {
    return null;
  }
  return isDecoded ? decode(token) : token;
};
export const getVerifiedToken = (token: string) => {
  try {
    return verify(token, process.env['AUTH_SIGN_KEY'] as string);
  } catch {
    return null;
  }
};
