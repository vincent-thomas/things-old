import { env } from '@auth/env.mjs';
import jwt from 'jsonwebtoken';
import { AccessToken } from './token';

export const verifyAuthorizationHeader = (authorizationHeader: string) => {
  if (!authorizationHeader) {
    return null;
  }
  const [type, token] = authorizationHeader.split(' ');
  if (type.toLowerCase() !== 'bearer') {
    return null;
  }
  // TODO: User based secret
  const verifiedUser = jwt.verify(token, env.AUTH_SIGN_KEY) as AccessToken;
  return verifiedUser;
};
