import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { errorSender, sender } from '../response_handler/senders';
import { ERROR_TYPE } from '../response_handler/errorTypes';

const getAuthorizationValues = (authHeaderValue: string) => {
  const [type, token] = authHeaderValue.split(' ');
  return [type, token];
};

const ifNotAuthorized = (res: Response) => sender(res, errorSender({
  cause: "",
  errors: [{
    cause: ERROR_TYPE.UNAUTHORIZED_ERROR,
    message: "You are not authorized to berform this action"
  }],
  status: 401
}));

export const authorize = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers?.authorization) {
    return ifNotAuthorized(res)
  }
  const [type, value] = getAuthorizationValues(req.headers?.authorization);
  if (type.toLowerCase() !== 'bearer') {
    return ifNotAuthorized(res)
  }
  const validToken = jwt.verify(
    value,
    process.env.AUTH_SIGN_KEY as string
  ) as jwt.JwtPayload;
  if (validToken?.exp === undefined || validToken?.exp < new Date().getTime()) {
    return ifNotAuthorized(res)
  }
  next();
};
