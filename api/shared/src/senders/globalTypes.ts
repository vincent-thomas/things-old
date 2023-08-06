export interface GlobalSenderProps {
  status: number;
}

export interface SendGenerator {
  success: boolean;
  data: any;
  error: {
    meta: string;
    errors: string[]
  } | null;
_sendMeta: GlobalSenderProps
}
