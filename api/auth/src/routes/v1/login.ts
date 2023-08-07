import { rateLimit, resultSender, sender, validate } from "@api/shared";
import { queryAuth } from "../../lib/inputs";
import { Router } from "express";
import {stringify} from "qs";
const { input: checkQueries, values: getInputs } = validate(queryAuth);
const loginV1 = Router();

loginV1.get('/', rateLimit, checkQueries, async (req, res) => {
  const { query: q } = getInputs(req);

  const { access_token: token } = req.cookies;

  if (!!token) {
    res.status(308).redirect(`/oauth/v1/authorize?${stringify(q)}`);
    return
  }

  sender(res, resultSender({data: token, status: 200}));


  // TODO: How to handle this?
});


export {loginV1}
