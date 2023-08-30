import { upsertUser, removeUser } from "../../src/data/db/repos";
import { createToken } from "../../src/core/hooks";

export const createTestUserAndToken = async () => {
  await upsertUser({
    email: "test@example.com",
    id: "TEST",
    locale: "en",
    name: "TESTING",
    verified_email: false,
    picture: "https://example.com"
  });
  return createToken("TEST");
};

export const removeTestUser = () => {
  return removeUser("TEST");
};
