import { Button } from '@things/ui';
import type { FC } from 'react';

export type NavbarProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
>;

const Navbar: FC<NavbarProps> = ({ className = '' }) => {
  return (
    <nav className={`flex justify-between py-2 px-6 ${className}`}>
      <Button className="flex pb-6 pt-5 px-2 gap-[2px]" variant="ghost" asChild>
        <a href="/">
          <h1 className="text-primary-accent font-semibold text-3xl">things</h1>
          <h1 className="text-[white] font-semibold text-3xl">Suite</h1>
        </a>
      </Button>
      <div className="flex items-center">
        <Button variant="link" asChild>
          <a href="/blog">Go to blog</a>
        </Button>
        <Button variant="ghost" className="ml-1">
          Get demo
        </Button>
        <Button variant="default" className="ml-7">
          Get Started
        </Button>
      </div>
    </nav>
  );
};
Navbar.displayName = 'Navbar';

export { Navbar };
