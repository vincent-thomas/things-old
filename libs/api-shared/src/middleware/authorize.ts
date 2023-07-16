import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const getAuthorizationValues = (authHeaderValue: string) => {
  const [type, token] = authHeaderValue.split(' ');
  return [type, token];
};

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    res.status(401).json({ no: 'no' });
    return;
  }
  const [type, value] = getAuthorizationValues(req.headers?.authorization);
  if (type.toLowerCase() !== 'bearer') {
    res.status(401).json({ no: 'no' });
    return;
  }
  const validToken = jwt.verify(
    value,
    process.env['AUTH_SIGN_KEY'] as string
  ) as jwt.JwtPayload;
  if (validToken?.exp < new Date().getTime()) {
    res.status(401).json({ no: 'no' });
    return;
  }

  next();
};
