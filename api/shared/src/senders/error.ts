import { GlobalSenderProps, SendGenerator } from "./globalTypes";

interface ErrorProps extends GlobalSenderProps {
  cause: string;
  errors: any[]
}


export const errorSender = <T extends ErrorProps>(payload: T): SendGenerator => {
  const {status,...error} = payload;

  if (status > 451 && status < 500 || status > 511) {
    throw new Error("Error code doesn't exist")
  } else if (status < 400) {
    throw new Error("Not an error code")
  }

  return {
    success: false,
    data: null,
    error: {
      meta: error.cause,
      errors: error.errors
    },
    _sendMeta: {
      status
    }
  }
}
