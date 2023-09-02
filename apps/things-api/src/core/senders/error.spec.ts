import { ERROR_TYPE } from "../http/enum";
import { errorSender } from "./error";
import type { RequestError } from "./globalTypes";

const ERROR = ERROR_TYPE.BAD_REQUEST_ERROR;

test("errorSender Result", () => {
  const result = errorSender({
    errors: [
      {
        cause: ERROR,
        message: "testing"
      }
    ],
    status: 400
  });
  expect(result.success).toEqual(false);
  expect(result.data).toEqual([]);
  expect(result._sendMeta).toEqual({ status: 400 });
  expect(result.errors).toHaveLength(1);
  const error = result.errors?.[0] as RequestError;
  expect(error).toHaveProperty("cause", ERROR);
  expect(error).toHaveProperty("message", "testing");
});

test("errorSender error codes under 4001", () => {
  const result = errorSender.bind(this, {
    cause: "testing",
    errors: [
      {
        cause: ERROR,
        message: "testing"
      }
    ],
    status: 200
  });
  expect(result).toThrowError();
  const another_result = errorSender.bind(this, {
    cause: "testing",
    errors: [
      {
        cause: ERROR,
        message: "testing"
      }
    ],
    status: 399
  });
  expect(another_result).toThrowError();
});

test("errorSender error codes over 511", () => {
  const result = errorSender.bind(this, {
    cause: "testing",
    errors: [
      {
        cause: ERROR,
        message: "testing"
      }
    ],
    status: 512
  });
  expect(result).toThrowError();
});
