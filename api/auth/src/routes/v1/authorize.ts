import { Response, Router } from 'express';
import { rateLimit, resultSender, sendPayload, validate } from '@api/shared';
import { z } from 'zod';
import qs from 'qs';
import { validateToken } from '../../lib/token';
import { getUser } from '@api/data';
const authorizeV1 = Router();

const { input, values: getFolderValues } = validate(
  z.object({
    query: z.object({
      redirect_uri: z.string().url(),
      state: z.string().optional(),
      client_id: z.string(),
      scope: z.string().regex(/^(email|,name)*$/, 'Invalid scope'),
      response_type: z.string().regex(/code/).default('code'),
    }),
  })
);

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
