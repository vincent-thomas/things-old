import { uid } from "uid/secure";
import { SendGenerator } from "./globalTypes";
import { Response } from "express";
import { logger } from "@things/logger";

export const sender = (res: Response, sender: SendGenerator) => {
  const { status } = sender._sendMeta;
  const requestId = uid(16);
  res.status(status).json({
    data: sender.data,
    errors: sender.errors,
    success: sender.success,
    timestamp: new Date().getTime(),
    requestId
  });
  logger.info(
    `status=${res.statusCode} requestId=${requestId} path=${res.req.baseUrl}`
  );
};

export const sendPayload = sender;
