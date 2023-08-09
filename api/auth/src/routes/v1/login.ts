import { ERROR_TYPE, errorSender, getToken, rateLimit, resultSender, sender, validate } from "@api/shared";
import { Router } from "express";
import {z} from "zod";
import { formatTo } from "@things/format";
import { getUserByCredentials } from "@api/data";
import { createToken } from "../../lib/token";

const schema = z.object({
  headers: z.object({
    authorization: z.string()
  })
})


const { input: checkQueries, values: getInputs } = validate(schema);
const loginV1 = Router();

loginV1.get('/', rateLimit, checkQueries, async (req, res) => {
  const {
    headers: {
      authorization
    }
  } = getInputs(req);

  const [type, base64Value] = authorization.split(" ");

  if (type.toLowerCase() !== "basic") {
    sender(res, resultSender({data: "invalid authorization type", status: 400}));
    return
  }

  const value = formatTo(base64Value, "base64", "utf-8");

  const [email, password] = value.split(":");

  const user = await getUserByCredentials(email, password)

  if (!user) {
    return sender(res, errorSender({errors: [{
      cause: ERROR_TYPE.UNAUTHORIZED_ERROR,
      message: "invalid email or password"
    }], status: 400}))
  }

  const token = createToken(user.id, ["email", "name"], process.env["AUTH_SIGN_KEY"] as string)
  sender(res, resultSender({data: {
    access_token: token
  }, status: 200}));
});


export {loginV1}
