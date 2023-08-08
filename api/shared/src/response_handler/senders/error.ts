import { GlobalSenderProps, RequestError, SendGenerator } from "./globalTypes";

interface ErrorProps extends GlobalSenderProps {
  errors: SendGenerator["errors"];
}




export const errorSender = <T extends ErrorProps>({
  errors,
  status
}: T): SendGenerator => {

  if (status > 451 && status < 500 || status > 511) {
    throw new Error("Error code doesn't exist")
  } else if (status < 400) {
    throw new Error("Not an error code")
  }
  return {
    success: false,
    data: null,
    errors,
    _sendMeta: {
      status
    }
  }
}