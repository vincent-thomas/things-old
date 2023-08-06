import {errorSender} from "./error"

test("errorSender", () => {
  const result = errorSender({ cause: "testing", errors: ["testin"], status: 400});
  expect(result.success).toEqual(false);
  expect(result.data).toEqual(null);
  expect(result._sendMeta).toEqual({status: 400});
})
