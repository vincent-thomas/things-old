import { Response, Router } from 'express';
import { rateLimit, validate } from '@api/shared';
import { validateToken } from '../../lib/token';
import { getUser, redis } from '@api/data';
import { queryAuth } from '../../lib/inputs';
import { stringify } from 'qs';
import { uid } from 'uid/secure';
import { URL } from 'url';

const authorizeV1 = Router();

const { input, values: getFolderValues } = validate(queryAuth);

const redirectToLogin = (res: Response, q: Record<string, unknown>) => {
  res.redirect(307, "http://localhost:6600/login?" + stringify(q))
}

authorizeV1.get('/', rateLimit, input, async (req, res) => {
  const { query: q } = getFolderValues(req);

  const { access_token: token } = req.cookies;

  if (!token) return redirectToLogin(res, q);

  const userData = validateToken(token);
  if (userData === null) {
    return redirectToLogin(res, q)
  }
  const scopes = userData.scope.split(",")
  const user = await getUser(userData.sub as string, {
    name: scopes.includes("name"),
    email: scopes.includes("email")
  });

  if (!user) {
    res.clearCookie('access_token', {
      path: '/',
    });
    return redirectToLogin(res, q);
  }

  const code = uid(32)

  await redis.set("oauth:user-code:" + code, user.id);
  await redis.expire("oauth:user-code:" + code, 60 * 5);

  const url = new URL(q.redirect_uri as string)

  url.searchParams.append("code", code)
  if (q.state) url.searchParams.append("state", q.state);
  
  res.redirect(308, url.toString())
});

export { authorizeV1 };
