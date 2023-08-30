import app from "src/app";
import request from "supertest";
import {
  createTestUserAndToken,
  removeTestUser,
  createPresignedUrl
} from "@e2e/helpers";
import { APP_URL } from "@e2e/data/defaults";

let authToken: string;
let presignedUrl: string;

beforeAll(async () => {
  await removeTestUser();
  authToken = await createTestUserAndToken();
  presignedUrl = (await createPresignedUrl(authToken)).replace(APP_URL, "");
});

afterAll(async () => {
  await removeTestUser();
});

test("Uploading to the presigned Url", async () => {
  const res = await request(app).post(presignedUrl);
  console.log(res.body, presignedUrl);
  expect(res.status).toBe(201);
});
