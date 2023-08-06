import type { GlobalSenderProps, SendGenerator } from "./globalTypes";

interface resultProps extends GlobalSenderProps {
  data?: Record<string, any> | Record<string, any>[];
}

export const resultSender = <T extends resultProps>(payload: T): SendGenerator => {
  const {status,...data} = payload;
  return {
    success: true,
    data,
    error: null,
    _sendMeta: {
      status
    }
  }
}
