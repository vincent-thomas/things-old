import {
  EnvValidator
} from "."

test("EnvValidator", () => {
  const env = new EnvValidator({
  });

  expect(() => env.validate()).toThrowError();
})