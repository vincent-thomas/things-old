import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { REQUEST_TYPE, sendPayload } from '../response';

const validateZodError = <Input>(error: ZodError<Input>) => {
  if (error.name === 'ZodError') {
    const customErrors = error.issues.map((v) => ({
      type: 'INVALID_INPUT',
      [`${v.path.join('.')}`]: v.message,
    }));
    return customErrors;
  } else return error;
};

export const validate = <Schema>(schema: ZodSchema<Schema>) => ({
  input: (req: Request, res: Response, next: NextFunction) => {
    const { body, params, query } = req;
    const isValid = schema.safeParse({ body, params, query });
    const sender = sendPayload(res.status(400));
    if (!isValid.success) {
      return sender(REQUEST_TYPE.ERROR, {
        errors: validateZodError(isValid.error) as unknown[],
      });
    } else {
      next();
    }
  },
  values: (req: Request) => {
    const { body, params, query } = req;
    return schema.parse({ body, params, query }) as Schema;
  },
});
