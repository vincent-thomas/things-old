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


/**
 * @swagger
 * /oauth/v1/authorize:
 *   get:
 *     tags:
 *       - V1 OAuth2
 *     description: Endpoint to authorize a user, redirects to login if not logged in
 *     parameters:
 *      - in: query
 *        name: redirect_uri
 *        required: true
 *        schema:
 *          type: string
 *          example: https://example.com
 *      - in: query
 *        name: state
 *        schema:
 *          type: string
 *          required: false
 *      - in: query
 *        name: client_id
 *        schema:
 *          type: string
 *          required: true
 *      - in: query
 *        name: scope
 *        schema:
 *          type: string
 *          required: true
 *          example: name
 *      - in: query
 *        name: response_type
 *        schema:
 *          type: string
 *          required: true
 *          example: code
 *
 *     responses:
 *       302:
 *       400:
 */

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
