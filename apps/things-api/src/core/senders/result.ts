import { Response } from "express";
import type { GlobalSenderProps, SendGenerator } from "./globalTypes";
import { STATUS_CODE } from "../http/enum";

interface resultProps extends Omit<GlobalSenderProps, "status"> {
  data?: unknown;
  status?: number;
}

export const resultSender = (payload: resultProps): SendGenerator => {
  const { status = 200, data } = payload;

  return {
    success: true,
    data: data,
    errors: null,
    _sendMeta: {
      status
    }
  };
};
