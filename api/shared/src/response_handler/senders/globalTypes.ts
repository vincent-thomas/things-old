import { ERROR_TYPE } from "../errorTypes";

export interface GlobalSenderProps {
  status: number;
}


export interface RequestError {
  cause: ERROR_TYPE,
  message: string
}

export interface SendGenerator {
  success: boolean;
  data: any;
  errors: RequestError[] | null;
_sendMeta: GlobalSenderProps
}
