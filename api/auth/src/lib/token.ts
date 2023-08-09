import { Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import {randomUUID} from "crypto"

export const validateToken = (token: string) =>
  jwt.verify(token, process.env['AUTH_SIGN_KEY'] as string) as JwtPayload & {scope: string};

type Scope = "email" | "name";

export const createToken = (userId: string, scope: Scope[], key: string) => {
  const date = new Date().getTime();

  const payload = {
    sub: userId,
    jti: randomUUID(),
    iat: date,
    exp: date + 86_400_000,
    scope: scope.join(","),
  };
  return jwt.sign(payload, key, { algorithm: 'HS512', noTimestamp: false });
};


export const saveToken = (res: Response, token: string) => {
  res.cookie("access_token", token, {
    maxAge: 86_400_000 / 1000
  })
};

export const getToken = (req: Request) => {
  console.log(req.cookies.access_token)
};
