import { resultSender } from "./result"


test("resultSender", () => {
  const result = resultSender({test: "test", status: 200});
  expect(result.success).toEqual(true);
  expect(result.data).toEqual({test: "test"});
  expect(result.error).toEqual(null);
  expect(result._sendMeta).toEqual({status: 200});
})

