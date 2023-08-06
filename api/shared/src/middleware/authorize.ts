import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { errorSender, sender } from '../senders';

const getAuthorizationValues = (authHeaderValue: string) => {
  const [type, token] = authHeaderValue.split(' ');
  return [type, token];
};

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers?.authorization) {
    return sender(res, errorSender({
      cause: "",
      errors: [
        "You are not authorized to beform this action"
      ],
      status: 401
    }));
  }
  const [type, value] = getAuthorizationValues(req.headers?.authorization);
  if (type.toLowerCase() !== 'bearer') {
    return sender(res, errorSender({
      cause: "",
      errors: [
        "You are not authorized to beform this action"
      ],
      status: 401
    }));
  }
  const validToken = jwt.verify(
    value,
    process.env['AUTH_SIGN_KEY'] as string
  ) as jwt.JwtPayload;
  if (validToken?.exp === undefined || validToken?.exp < new Date().getTime()) {
    return sender(res, errorSender({
      cause: "",
      errors: [
        "You are not authorized to beform this action"
      ],
      status: 401
    }));
  }
  next();
};
