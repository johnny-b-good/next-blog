// Lib
// -----------------------------------------------------------------------------
import { FC, ReactNode } from "react";
import { clsx } from "clsx";
import Link, { LinkProps } from "next/link";

// Props
// -----------------------------------------------------------------------------
export interface LinkButtonProps extends LinkProps {
  variant?: "primary" | "default" | "text";
  className?: string;
  children: ReactNode;
}

/** Link button component */
export const LinkButton: FC<LinkButtonProps> = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
  return (
    <Link
      className={clsx(
        "flex cursor-pointer items-center gap-2 whitespace-nowrap rounded border px-4 py-2 font-semibold outline-none transition-colors",
        "focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50",

        variant === "primary" && [
          "border-cyan-600 bg-cyan-500 text-white shadow-sm",
          "hover:border-cyan-500 hover:bg-cyan-400",
        ],

        variant === "default" && [
          "border-slate-300 bg-white text-slate-700 shadow-sm",
          "hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-500",
        ],

        variant === "text" && [
          "border-transparent bg-transparent text-slate-700 shadow-none",
          "hover:bg-cyan-50 hover:text-cyan-500",
          "focus:border-transparent focus:text-cyan-500 focus:ring-transparent",
        ],

        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
