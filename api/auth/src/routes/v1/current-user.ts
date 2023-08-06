import { Response, Router } from 'express';
import { errorSender, rateLimit, resultSender, sendPayload } from '@api/shared';
import { validateToken } from '../../lib/token';
import { getUser } from '@api/data';
const currentUserV1 = Router();

const ifNotLoggeed = (res: Response) =>
  sendPayload(res, errorSender({ errors: ["User not logged in"], cause: "USER_UNAUTHENTICATED", status: 400 }));

currentUserV1.get('/', rateLimit, async (req, res) => {

  const { access_token: token } = req.cookies;
  if (token === undefined) {
    return ifNotLoggeed(res);

  }
  const validated = validateToken(token);

  if (validated) {
    return ifNotLoggeed(res);
  }

  const userData = validateToken(token);

  const user = await getUser(userData.sub as string);

  if (!user) {
    res.clearCookie('access_token', {
      path: '/',
    });
    return ifNotLoggeed(res)
  }

  return sendPayload(res, resultSender({
    status: 200,
    data: user
  }));
});

export { currentUserV1 };
