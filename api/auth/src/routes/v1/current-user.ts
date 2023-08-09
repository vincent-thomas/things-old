import { Response, Router } from 'express';
import { rateLimit } from '@api/shared';
import { validateToken } from '../../lib/token';
import { getUser } from '@api/data';
import { ERROR_TYPE,resultSender,errorSender, sender, STATUS_CODE } from '@things/express-func';
const currentUserV1 = Router();

const ifNotLoggeed = (res: Response) =>
  sender(res, errorSender({ errors: [{cause: ERROR_TYPE.UNAUTHORIZED_ERROR, message: "NOT authed"}], status: 401 }));

currentUserV1.get('/', rateLimit, async (req, res) => {

  // Get value of Bearer token
  const token = req.headers.authorization?.split(" ")[1];
  if (token === undefined) return ifNotLoggeed(res);
  let value


  try {
    value = validateToken(token)
  }
  catch(e) {
    sender(res, errorSender({status: STATUS_CODE.INTERNAL_SERVER_ERROR,errors: [{cause: ERROR_TYPE.INTERNAL_SERVER_ERROR, message: "unknown"}]}))
    return;
  }
  if (!value) return ifNotLoggeed(res);
  const scopes = value.scope.split(",");
  const user = await getUser(value.sub as string, {
    name: scopes.includes("name"),
    email: scopes.includes("email")
  });

  return sender(res, resultSender({
    status: 200,
    data: user 
  }));
});

export { currentUserV1 };
