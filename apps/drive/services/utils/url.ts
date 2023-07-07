import { env } from "env.mjs";

export const getAppUrl = () => {
  return typeof window !== "undefined"
    ? `${window.location.hostname === "localhost" ? "http:" : "https:"}//${
        window.location.host
      }`
    : env.APP_URL;
};
