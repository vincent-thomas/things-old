import type { GlobalSenderProps, SendGenerator } from "./globalTypes";

interface resultProps extends Omit<GlobalSenderProps, "status"> {
  data?: unknown;
  status?: number;
}

export const resultSender = (payload: resultProps): SendGenerator => {
  const {status = 200, data} = payload;

  return {
    success: true,
    data: data,
    errors: null,
    _sendMeta: {
      status
    }
  }
}
