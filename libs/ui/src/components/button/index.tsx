import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'cva';
import { cn } from '../../utils';
import { BaseProps } from '../../types/baseProps';
import {
  ButtonHTMLAttributes,
  forwardRef,
  type MouseEventHandler,
} from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-muted',
        destructive:
          'border-2 border-destructive text-primary  bg-transparent hover:text-destructive-foreground hover:bg-destructive',
        outline:
          'border-2 border-border hover:border-primary bg-transparent hover:bg-primary text-primary hover:text-primary-foreground',
        ghost: 'hover:bg-primary-ghost text-primary bg-opacity-100 ',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
export interface ButtonProps
  extends BaseProps,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ UNSAFE_className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className: UNSAFE_className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
