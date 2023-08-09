import {createToken} from "./token";
import {JsonWebTokenError, JwtPayload, decode, verify} from "jsonwebtoken";

let result: string;

beforeEach(() => {
  result = createToken("123", ["email", "name"], "123");
});

test("createToken Values correct", () => {

  const date = new Date().getTime();

  const userInfo = decode(result) as JwtPayload;
  expect(userInfo!.iat).toBeCloseTo(date, -10)
  expect(userInfo['scope'].split(",").length).toBe(2)
  expect(userInfo.sub).toBe("123")
})

test("createToken signs correctly", () => {
  const result = createToken("123", ["email", "name"], "123");
  expect(verify.bind(this, result, "123")).not.toThrowError(JsonWebTokenError)

})
