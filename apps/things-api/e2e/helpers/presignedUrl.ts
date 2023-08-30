import request from "supertest";
import app from "../../src/app";
import { z } from "zod";

export const createPresignedUrl = async (authToken: string) => {
  const res = await request(app)
    .post("/drive/object")
    .set("Authorization", `Bearer ${authToken}`)
    .send({
      fileKey: "testing",
      fileType: "txt",
      folderId: "testing"
    });
  expect(res.body).toHaveProperty("url");
  expect(res.body).toHaveProperty("expires");
  const parsed = z
    .object({ url: z.string().url(), expires: z.string() })
    .safeParse(res.body);

  expect(parsed.success).toBe(true);
  if (parsed.success === false) {
    throw new Error();
  }
  return parsed.data.url;
};
