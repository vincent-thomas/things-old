import { resultSender } from "./result";

test("resultSender with status", () => {
  const result = resultSender({ data: { test: "test" }, status: 200 });
  expect(result.success).toEqual(true);
  expect(result.data).toEqual({ test: "test" });
  expect(result.errors).toEqual(null);

  expect(result._sendMeta).toEqual({ status: 200 });
});

test("resultSender with status", () => {
  const result = resultSender({ data: { test: "test" } });
  expect(result.success).toEqual(true);
  expect(result.data).toEqual({ test: "test" });
  expect(result.errors).toEqual(null);

  expect(result._sendMeta).toEqual({ status: 200 });
});
