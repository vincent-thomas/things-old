import { createUser } from '@api/data';
import { rateLimit, validate } from '@api/shared';
import { logger } from '@things/logger';
import { Router } from 'express';
import { z } from 'zod';
import { createToken, saveToken } from '../../lib/token';
import {
  ERROR_TYPE,
  errorSender,
  resultSender,
  sender,
} from '@things/express-func';
import { env } from '../../lib/env';
const createUserV1 = Router();

const schema = z.object({
  body: z.object({
    email: z.string().email(),
    fullName: z.string(),
    password: z.string(),
  }),
  query: z.object({
    cookie: z.string().optional(),
  }),
});

// const getBasicAuth = (authorization: string) => {
//   const [type, base64Value] = authorization.split(' ');
//   const reuslt = formatTo(base64Value, 'base64', 'utf-8');
//   const [username, password] = reuslt.split(':');
//   return { email: username, password };
// };

const { input, values } = validate(schema);

createUserV1.post('/', rateLimit, input, async (req, res) => {
  const {
    body: { email, fullName, password },
    query: { cookie },
  } = values(req);
  // TODO: Validera basic auth headern

  const shouldSendCookie = cookie === '';

  try {
    const result = await createUser(email, fullName, password);
    const token = createToken(
      result.id,
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
  } catch (error) {
    logger.error(error);
    return sender(
      res,
      errorSender({
        errors: [
          {
            cause: ERROR_TYPE.CONFLICT,
            message: 'User already exists',
          },
        ],
        status: 401,
      })
    );
  }
});

export default createUserV1;
