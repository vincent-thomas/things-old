import { type ReactNode, type FC } from "react";
import { cn } from "../../utils";

export interface NavbarProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  left?: ReactNode;
  right?: ReactNode;
}

const Navbar: FC<NavbarProps> = ({ className, left, right }) => {
  return (
    <nav className={cn("text-start", className)}>
      <div>{left}</div>
      <div></div>
      <div>{right}</div>
    </nav>
  );
};
Navbar.displayName = "Navbar";

export { Navbar };
