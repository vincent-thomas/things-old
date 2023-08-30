import type { ReactNode } from "react";

export interface BaseProps {
  UNSAFE_className?: string;
}

export interface BaseChildrenProps extends BaseProps {
  children?: ReactNode;
}
