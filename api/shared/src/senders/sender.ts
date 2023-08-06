import { uid } from "uid/secure";
import { SendGenerator } from "./globalTypes";
import { Response } from "express";

export const sender = (res: Response, sender: SendGenerator) => {
  const {status = 200} = sender._sendMeta
    res.status(status).json({
      data: sender.data,
      error: sender.error,
      success: sender.success,
      timestamp: new Date().getTime(),
      requestId: uid(16),
    });
}

export const sendPayload = sender;
