import { authorize } from "./authorize";
import { NextFunction, Request } from "express";
const res: any = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  req: {
    baseUrl: "/oauth/v1/authorize"
  }
};

test("Not calling next function if unauthorized", () => {
  const nextFunction = jest.fn() as NextFunction;
  const req: any = {};
  authorize(req, res, nextFunction);
  expect(nextFunction).not.toHaveBeenCalled();
});

test("Not calling next function if not parsed correctly", () => {
  const nextFunction = jest.fn() as NextFunction;
  const req: any = {
    headers: {
      authorization: "nonbearer testing"
    }
  };
  authorize(req, res, nextFunction);
  expect(nextFunction).not.toHaveBeenCalled();
});

test("Showing error message correctly", () => {
  const nextFunction = jest.fn() as NextFunction;
  const req = {
    headers: {
      authorization: "nonbearer testing"
    }
  } as Request;
  authorize(req, res, nextFunction);
  expect(res.status).toHaveBeenCalledWith(401);
  expect(nextFunction).not.toHaveBeenCalled();

  // * Sidoeffekter of 'authorize'
  const params = res.json.mock.calls[0][0];
  expect(params.data).toStrictEqual([]);
  expect(params.errors).toHaveLength(1);
});

// TODO Detta funkar inte, jag vet inte varför

// // test("Everything should work correctly", async () => {
// //   const nextFunction = jest.fn() as NextFunction;
// //   const token = sign({}, process.env.API_SIGN_KEY as string);
// //   const req = {
// //     headers: {
// //       authorization: `Bearer ${token}`
// //     }
// //   }

// //   authorize(req as Request, res, nextFunction)

// // expect(res.json.mock.calls[0][0]).toBe('')
// // expect(nextFunction).toHaveBeenCalled();

// // })
