import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../utils';
import { BaseChildrenProps, BaseProps } from '../../types/baseProps';
import {
  ButtonHTMLAttributes,
  forwardRef,
  type MouseEventHandler,
} from 'react';

import Default, { destructive, ghost, link, outline } from './button.css';

const variantStyle = {
  default: Default,
  destructive,
  ghost,
  link,
  outline,
};

interface StyleProps {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'lg' | 'sm';
}

export interface ButtonProps extends BaseChildrenProps, StyleProps {
  asChild?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { UNSAFE_className, variant = 'default', size, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(variantStyle[variant], {
          size,
          className: UNSAFE_className,
        })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
