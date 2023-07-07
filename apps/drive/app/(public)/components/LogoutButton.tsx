"use client";

import { utils } from "@drive/services/utils";

export const LogoutButton = () => {
  return <button onClick={async () => {
    await fetch(`${utils.getAppUrl()}/oauth/logout`, {method: "POST"});
    window.location.reload()
  }}>logout</button>
}