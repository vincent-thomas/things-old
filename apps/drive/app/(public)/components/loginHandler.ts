"use server";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export const loginAuthStateGen = async () => {
  const state = randomUUID();
  cookies().set("authorization_state", state, {
    httpOnly: true,
  });

  return { state };
};
