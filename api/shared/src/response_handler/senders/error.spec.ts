import { ERROR_TYPE } from "../errorTypes";
import {errorSender} from "./error"
import type { RequestError } from "./globalTypes";

const ERROR = ERROR_TYPE.BAD_REQUEST_ERROR

test("errorSender Result", () => {
  const result = errorSender({ cause: "testing", errors: [{
    cause: ERROR,
    message: "testing"
  }], status: 400});
  expect(result.success).toEqual(false);
  expect(result.data).toEqual(null);
  expect(result._sendMeta).toEqual({status: 400});
  expect(result.errors).toHaveLength(1);
  const error = result.errors?.[0] as RequestError;
  expect(error).toHaveProperty("cause", ERROR);
  expect(error).toHaveProperty("message", "testing");
})
