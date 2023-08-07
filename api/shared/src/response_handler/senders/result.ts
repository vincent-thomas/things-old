import type { GlobalSenderProps, SendGenerator } from "./globalTypes";

interface resultProps extends GlobalSenderProps {
  data?: unknown;
}

export const resultSender = <T extends resultProps>(payload: T): SendGenerator => {
  const {status,...data} = payload;
  return {
    success: true,
    data,
    errors: null,
    _sendMeta: {
      status
    }
  }
}
