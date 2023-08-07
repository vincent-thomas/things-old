import { Response, Router } from 'express';
import { rateLimit, resultSender, sendPayload, validate } from '@api/shared';
import qs from 'qs';
import { validateToken } from '../../lib/token';
import { getUser } from '@api/data';
import { queryAuth } from '../../lib/inputs';

const authorizeV1 = Router();

const { input, values: getFolderValues } = validate(queryAuth);

const redirectToLogin = (res: Response, q: Record<string, unknown>) =>
  res.status(308).redirect(`/oauth/v1/login?${qs.stringify(q)}`);

authorizeV1.get('/', rateLimit, input, async (req, res) => {
  const { query: q } = getFolderValues(req);

  const { access_token: token } = req.cookies;

  if (!token) return redirectToLogin(res, q);

  const userData = validateToken(token);
  const user = await getUser(userData.sub as string);

  if (!user) {
    res.clearCookie('access_token', {
      path: '/',
    });
    return redirectToLogin(res, q);
  }
  sendPayload(res, resultSender({ data: user, status: 200 }));
});

export { authorizeV1 };
