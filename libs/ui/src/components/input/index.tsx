import { type InputHTMLAttributes, forwardRef } from 'react';

import { cn } from '../../utils';
import { InputCss } from './input.css';

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      onKeyDown={(e) => {
        if (e.key !== 'Escape' || document.activeElement === document.body)
          return;
        if (document.activeElement instanceof HTMLElement)
          document.activeElement.blur();
      }}
      className={cn(InputCss,
        // `flex h-10 w-full text-primary rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-border-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
