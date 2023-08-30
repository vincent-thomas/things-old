import { GlobalSenderProps, SendGenerator } from "./globalTypes";

interface ErrorProps extends GlobalSenderProps {
  errors: SendGenerator["errors"];
}

export const errorSender = ({ errors, status }: ErrorProps): SendGenerator => {
  if ((status > 451 && status < 500) || status > 511) {
    throw new Error("Error code doesn't exist");
  } else if (status < 400) {
    throw new Error("Not an error code");
  }
  return {
    success: false,
    data: [],
    errors,
    _sendMeta: {
      status
    }
  };
};
