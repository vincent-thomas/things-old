import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validate = <T>(schema: ZodSchema<T>) => ({
  input: (req: Request, res: Response, next: NextFunction) => {
    const { body, params, query } = req;
    const isValid = schema.safeParse({ body, params, query });
    if (!isValid.success) {
      res.status(400).send(isValid);
      return;
    } else next();
  },
  values: (req: Request) => {
    const { body, params, query } = req;

    return schema.parse({ body, params, query }) as T;
  },
});
