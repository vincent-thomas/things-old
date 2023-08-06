import { Response } from 'express';
import { uid } from 'uid/secure';

export enum REQUEST_TYPE {
  ERROR,
  SUCCESS,
}

export const sendPayload =
  (res: Response) =>
  (
    type: REQUEST_TYPE,
    { payload, errors }: { payload?: unknown; errors?: any[] }
  ) => {
    if (type === REQUEST_TYPE.SUCCESS) {
      res.json({
        success: true,
        timestamp: new Date().getTime(),
        requestId: uid(12),
        data: payload,
        error: null,
      });
    } else {
      res.json({
        success: false,
        timestamp: new Date().getTime(),
        requestId: uid(12),
        data: null,
        errors,
      });
    }
  };
