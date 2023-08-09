import { Button, Title } from '@things/ui';
import type { FC } from 'react';

export type NavbarProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
>;

const Navbar: FC<NavbarProps> = ({ className = '' }) => {
  return (
    <nav className={`flex justify-between px-6 py-2 ${className}`}>
      <Button
        UNSAFE_className="flex gap-[2px] px-2 pb-6 pt-5"
        variant="ghost"
        asChild
      >
        <a href="/">
          <Title className="text-primary-accent text-3xl font-semibold">things</Title>
          <Title className="text-3xl font-semibold text-[black]">Suite</Title>
        </a>
      </Button>
      <div className="flex items-center">
        <Button variant="link" asChild>
          <a href="/blog">Go to blog</a>
        </Button>
        <Button variant="ghost" UNSAFE_className="ml-1">
          Get demo
        </Button>
        <Button variant="default" UNSAFE_className="ml-7">
          Get Started
        </Button>
      </div>
    </nav>
  );
};
export { Navbar };
