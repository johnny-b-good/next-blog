// Lib
// -----------------------------------------------------------------------------
import { FC, ReactNode } from "react";
import { clsx } from "clsx";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

// Props
// -----------------------------------------------------------------------------
export interface LinkProps extends NextLinkProps {
  className?: string;
  children: ReactNode;
}

/** Link component */
export const Link: FC<LinkProps> = ({ children, className, ...props }) => {
  return (
    <NextLink
      className={clsx(
        "hover:text-coutline-none text-cyan-500 underline outline-none transition-colors",
        "focus:rounded focus:border-cyan-300 focus:ring focus:ring-cyan-200 focus:ring-opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
};
