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
        "text-cyan-500 underline transition-colors hover:text-cyan-300",
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
};
