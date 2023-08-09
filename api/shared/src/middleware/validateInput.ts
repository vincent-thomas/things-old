import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';
import {  errorSender, sender } from '@things/express-func';

const validateZodError = <Input>(error: ZodError<Input>) => {
  if (error.name === 'ZodError') {
    const customErrors = error.issues.map((v) => ({
      type: 'INVALID_INPUT',
      reason: v.message, where: v.path[0], value: v.path[1]}));
    return customErrors;
  } else return error;
};

export const validate = <Schema>(schema: ZodSchema<Schema>) => ({
  input: (req: Request, res: Response, next: NextFunction) => {
    const { body, params, query, headers } = req;
    const isValid = schema.safeParse({ body, params, query,headers });
    if (!isValid.success) sender(res, errorSender({errors: validateZodError(isValid.error) as any,
     status: 400 }));
     else next();

  },
  values: (req: Request) => {
    const { body, params, query, headers } = req;
    return schema.parse({ body, params, query,headers }) as Schema;
  },
});
