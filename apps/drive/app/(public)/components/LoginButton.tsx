"use client";

import { loginAuthStateGen } from "./loginHandler";
import { utils } from "@drive/services/utils";

export const LoginButton = () => {
  return (
    <button
      onClick={async () => {
        const result = await loginAuthStateGen();
        window.location.href = `/oauth/authorize?callback_url=${encodeURIComponent(
          `${utils.getAppUrl()}/callback`
        )}&state=${result.state}`;
      }}
    >
      Login
    </button>
  );
};
