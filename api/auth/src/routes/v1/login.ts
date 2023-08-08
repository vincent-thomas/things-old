import { rateLimit, resultSender, sender, validate } from "@api/shared";
import { queryAuth } from "../../lib/inputs";
import { Router } from "express";
import {stringify} from "qs";
const { input: checkQueries, values: getInputs } = validate(queryAuth);
const loginV1 = Router();


/**
 * @swagger
 * /oauth/v1/login:
 *   get:
 *     tags:
 *       - V1 OAuth2
 *     description: Logs a user in
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
loginV1.get('/', rateLimit, checkQueries, async (req, res) => {
  const { query: q } = getInputs(req);

  const { access_token: token } = req.cookies;

  if (token) {
    res.status(308).redirect(`/oauth/v1/authorize?${stringify(q)}`);
    return
  }

  sender(res, resultSender({data: token, status: 200}));


  // TODO: How to handle this?
});


export {loginV1}
