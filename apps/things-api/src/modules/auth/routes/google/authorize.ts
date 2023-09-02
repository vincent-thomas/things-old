import { Router } from "express";
import { URLSearchParams } from "url";
import { validate } from "../../../../core/middleware/public_api";
import { env } from "../../../../env";
import { z } from "zod";
import { getToken } from "src/core/hooks";

const authorizeV1 = Router();

const validator = validate(
  z.object({
    query: z.object({
      redirect_uri: z.string(),
      src: z.enum(["web", "terminal"]).optional().default("web"),
      cookie: z.enum(["true", "false"]).optional()
    })
  })
);

const options = {
  redirect_uri: "http://localhost:8080/auth/google/callback",
  client_id: env.getEnv("authGoogleId"),
  access_type: "offline",
  response_type: "code",
  prompt: "consent",
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ].join(" ")
};

const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";

authorizeV1.get("/", validator.input, async (req, res) => {
  const { query } = validator.values(req);

  const token = getToken(req, true);
  if (token === null) {
    // @ts-ignore
    options["state"] = JSON.stringify(query);
    const qs = new URLSearchParams(options);
    return res.redirect(`${googleAuthUrl}?${qs.toString()}`);
  }

  res.send(token);
});

export { authorizeV1 };
