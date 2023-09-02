import { z } from "zod";
import { validate } from "./validateInput";
import { NextFunction, Request, Response } from "express";

const schema = z.object({
  body: z.object({
    test: z.string()
  })
});

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  req: {
    baseUrl: "/oauth/v1/authorize"
  }
} as unknown as Response;

describe("validateInput", () => {
  test("Input-middleware validating with correct input", () => {
    const nextFunction = jest.fn() as NextFunction;
    const req = {
      body: {
        test: "test"
      }
    };
    validate(schema).input(req as Request, res, nextFunction);
    expect(res.status).not.toHaveBeenCalledWith(400);
    expect(nextFunction).toHaveBeenCalled();
  });

  test("Input-middleware validating with incorrect input", () => {
    const nextFunction = jest.fn() as NextFunction;

    const req = {
      body: {
        testno: "test"
      }
    };
    validate(schema).input(req as Request, res, nextFunction);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(nextFunction).not.toHaveBeenCalled();
  });

  test("Values validating with correct input", () => {
    const req = {
      body: {
        test: "test"
      }
    };

    const result = validate(schema).values(req as Request);
    expect(result).toEqual({ body: { test: "test" } });
  });

  test("Values validating with incorrect input", () => {
    const req = {
      body: {
        testno: "test"
      }
    };

    const result = validate(schema).values.bind(this, req as Request);
    expect(result).toThrowError();
  });
});
