import request from "supertest";
import app from "../../src/app";

test("It should response the GET method", () => {
  request(app)
    .get("/healthcheck")
    .then((response) => {
      expect(response.statusCode).toBe(200);
    });
});
