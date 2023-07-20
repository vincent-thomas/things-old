export enum ErrorCause {
  'NOT_AUTHORIZED' = 'NOT_AUTHORIZED',
}

export interface IError {
  cause: ErrorCause;
  message: string;
}

export class Error {
  constructor(private cause: ErrorCause, private msg?: string) {}

  getError() {
    return {
      success: false,
      error: {
        cause: this.cause,
        message: this.msg,
      },
    };
  }
}
