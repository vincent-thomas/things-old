import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const getTokens = (store: ReadonlyRequestCookies) => {
  const accessToken = store.get("access_token")?.value as string;
  return {
    accessToken: accessToken,
  };
};
