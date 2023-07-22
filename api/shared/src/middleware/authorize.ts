import { AuthRequest, Error, ErrorCause } from '../';
import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const getAuthorizationValues = (authHeaderValue: string) => {
  const [type, token] = authHeaderValue.split(' ');
  return [type, token];
};

export const authorize: any = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(
    ErrorCause.NOT_AUTHORIZED,
    'You are not authorized to beform this action'
  ).getError();
  if (!req.headers?.authorization) {
    res.status(401).json(error);
    return;
  }
  const [type, value] = getAuthorizationValues(req.headers?.authorization);
  if (type.toLowerCase() !== 'bearer') {
    res.status(401).json(error);
    return;
  }
  const validToken = jwt.verify(
    value,
    process.env['AUTH_SIGN_KEY'] as string
  ) as jwt.JwtPayload;
  if (validToken?.exp === undefined || validToken?.exp < new Date().getTime()) {
    res.status(401).json(error);
    return;
  }
  next();
};
