import { ERROR_TYPE } from "../enums/errorTypes";

export interface GlobalSenderProps {
  status: number;
}

export interface RequestError {
  cause: ERROR_TYPE;
  message: string;
}

export interface SendGenerator<T = unknown> {
  success: boolean;
  data: T;
  errors: RequestError[] | null;
  _sendMeta: GlobalSenderProps;
}
