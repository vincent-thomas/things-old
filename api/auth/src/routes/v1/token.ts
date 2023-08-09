import { Response, Router } from 'express';
import { ERROR_TYPE,  rateLimit, validate } from '@api/shared';
import { createToken } from '../../lib/token';
import { redis } from '@api/data';
import { stringify } from 'qs';
import { resultSender,errorSender, sender} from "@things/express-func"
import { z } from 'zod';

const tokenV1 = Router();


const schema = z.object({
  query: z.object({
    grant_type: z.literal("authorization_code"),
    client_id: z.string(),
    client_secret: z.string(),
    code: z.string(),
  })
})


const { input, values: getFolderValues } = validate(schema);

const redirectToLogin = (res: Response, q: Record<string, unknown>) => {
  res.redirect(307, "/oauth/v1/to-login" + stringify(q))
}

tokenV1.post('/', rateLimit, input, async (req, res) => {
  // TODO: validera client_id and client_secret
  const { query: {client_id, client_secret, code, grant_type} } = getFolderValues(req);

  if (grant_type === "authorization_code") {
    const userId = await redis.get("oauth:user-code:" + code) as string;
    if (userId === null) {
      sender(res, errorSender({
        status: 400,
        errors: [{cause: ERROR_TYPE.BAD_REQUEST_ERROR, message: "Invalid code"}]
      }));
      return;
    }
    const result = createToken(userId, ["name", "email"], process.env["AUTH_SIGN_KEY"] as string);
    sender(res, resultSender({
      status: 200,
      data: {access_token: result}
    }))
    await redis.del("oauth:user-code:" + code);
  }
});

export { tokenV1 };

