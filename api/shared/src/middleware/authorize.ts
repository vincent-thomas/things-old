import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { errorSender, sender, ERROR_TYPE } from '@things/express-func';
import { env } from '../env';



const getAuthorizationValues = (authHeaderValue: string) => {
  const [type, token] = authHeaderValue.split(' ');
  return [type, token];
};

const ifNotAuthorized = (res: Response) =>
  sender(
    res,
    errorSender({
      errors: [
        {
          cause: ERROR_TYPE.UNAUTHORIZED_ERROR,
          message: 'You are not authorized to perform this action',
        },
      ],
      status: 401,
    })
  );

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers?.authorization) {
    return ifNotAuthorized(res);
  }
  const [type, value] = getAuthorizationValues(req.headers?.authorization);
  if (type.toLowerCase() !== 'bearer') {
    return ifNotAuthorized(res);
  }
  const validToken = jwt.verify(
    value,
    env.getEnv("signKey"),
  ) as jwt.JwtPayload;
  if (validToken?.exp === undefined) {
    return ifNotAuthorized(res);
  }
  next();
};
