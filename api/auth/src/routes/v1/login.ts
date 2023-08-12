import { ERROR_TYPE, rateLimit, validate } from '@api/shared';
import { Router } from 'express';
import { errorSender, resultSender, sender } from '@things/express-func';

import { z } from 'zod';
import { getUserByCredentials } from '@api/data';
import { createToken, saveToken } from '../../lib/token';
import { env } from '../../lib/env';

const schema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  query: z.object({
    cookie: z.string().optional(),
  }),
});

const { input: checkQueries, values: getInputs } = validate(schema);
const loginV1 = Router();

loginV1.post('/', rateLimit, checkQueries, async (req, res) => {
  const {
    body: { email, password },
    query: { cookie },
  } = getInputs(req);
  const shouldSendCookie = cookie === '';

  const user = await getUserByCredentials(email, password);

  if (!user) {
    return sender(
      res,
      errorSender({
        errors: [
          {
            cause: ERROR_TYPE.UNAUTHORIZED_ERROR,
            message: 'invalid email or password',
          },
        ],
        status: 400,
      })
    );
  }

  const token = createToken(
    user.id,
    ['email', 'name'],
   env.getEnv("signKey") 
  );
  if (shouldSendCookie) {
    saveToken(res, token);
  }
  sender(
    res,
    resultSender({
      data: {
        access_token: token,
      },
      status: 200,
    })
  );
});

export { loginV1 };
