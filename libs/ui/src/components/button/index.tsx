import { cva, type VariantProps } from 'cva';
import { twMerge } from 'tailwind-merge';
const button = cva(
  ['px-4', 'py-2', 'rounded-md', 'bg-transparent', 'cursor-pointer'],
  {
    variants: {
      intent: {
        primary: ['bg-red-400'],
        secondary: ['bg-blue-300'],
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

// const btnStyles = (variants: VariantProps<typeof buttonVariants>) =>
//   variants.twMerge(buttonVariants(variants));

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  ...props
}) => <button className={twMerge(button({ intent }), className)} {...props} />;
