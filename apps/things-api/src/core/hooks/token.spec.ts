import { Request } from "express";
import { getToken } from "./token";
import { sign, decode } from "jsonwebtoken";

it("Gets and validates token", () => {
  const KEY = process.env.API_AUTH_SIGN_KEY as string;
  const TEST_KEY = sign("1234", KEY);
  const req = {
    headers: {
      authorization: `Bearer ${TEST_KEY}`
    }
  } as Request;
  const result = getToken(req);
  expect(result).toEqual(decode(TEST_KEY));
});
