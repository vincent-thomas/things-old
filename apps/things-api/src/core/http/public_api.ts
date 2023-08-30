import { Response } from "express";
import { STATUS_CODE } from "./enum";

export * from "./enum";

export const sendResult = (
  res: Response,
  payload: unknown,
  status: STATUS_CODE = STATUS_CODE.OK
) => {
  res.status(status).json(payload);
};
