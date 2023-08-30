import request from "supertest";
import app from "../../../../src/app";
import { createToken } from "@core/hooks";
import { upsertUser } from "@core/data";

let authToken: string;

beforeAll(async () => {
  await upsertUser({
    email: "test@example.com",
    id: "TEST",
    locale: "en",
    name: "TESTING",
    verified_email: false,
    picture: "https://example.com"
  });
  authToken = createToken("TEST");
});

test("Getting object that doesn't exist", (done) => {
  async function toTest() {
    const res = await request(app)
      .get("/drive/object/testing_not_existing")
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.statusCode).toBe(404);
    done();
  }
  toTest();
});

test("Updating object that doesn't exist", (done) => {
  async function toTest() {
    const res = await request(app)
      .patch("/drive/object/testing_not_existing")
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
    done();
  }
  toTest();
});
