import { Request, Response } from "express";
import { verify, sign } from "jsonwebtoken";
import { env } from "../../env";

interface Token {
  sub: string;
  jti: string;
  iat: number;
  exp: number;
  scope: string;
}

export const getToken = (req: Request, shouldUseCookies = false): Token => {
  const authHeader = req.headers?.authorization;

  const token = authHeader?.split(" ")[1];
  if (!token && shouldUseCookies) {
    const token = req.cookies.access_token;
    return validateToken(token) as Token;
  } else {
    const headerToken = validateToken(token as string) as Token;
    return headerToken;
  }
};
export const validateToken = (token: string) => {
  try {
    const value = verify(token, env.getEnv("signKey")) as Token;
    return value;
  } catch (e) {
    return null;
  }
};

export const createToken = (userId: string) => {
  const result = sign(
    {
      sub: userId
    },
    env.getEnv("signKey"),
    {
      algorithm: "HS256",
      expiresIn: 86_400,
      issuer: "https://things-api.v-thomas.com",
      noTimestamp: false
    }
  );
  return result;
};

export const saveToken = (res: Response, token: string) => {
  res.cookie("access_token", token, {
    maxAge: 86_400_000
  });
};
