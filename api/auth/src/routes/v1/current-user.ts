import { Router } from 'express';
import { REQUEST_TYPE, rateLimit, sendPayload } from '@api/shared';
import { validateToken } from '../../lib/token';
import { getUser } from '@api/data';
const currentUserV1 = Router();

const ifNotLoggeed = (sender: any) =>
  sender(REQUEST_TYPE.ERROR, { errors: [{ message: 'User not logged in' }] });

currentUserV1.get('/', rateLimit, async (req, res) => {
  const sender = sendPayload(res);

  const { access_token: token } = req.cookies;
  if (token === undefined) return ifNotLoggeed(sender);
  const validated = validateToken(token);

  if (validated) {
    return ifNotLoggeed(sender);
  }

  const userData = validateToken(token);

  const user = await getUser(userData.sub as string);

  if (!user) {
    res.clearCookie('access_token', {
      path: '/',
    });
    return ifNotLoggeed(sender);
  }

  return sender(REQUEST_TYPE.SUCCESS, { payload: user });
});

export { currentUserV1 };
