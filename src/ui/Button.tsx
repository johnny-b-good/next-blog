// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import {
  Button as HeadlessButton,
  ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";
import { clsx } from "clsx";

// Props
// -----------------------------------------------------------------------------
export interface ButtonProps extends HeadlessButtonProps {
  variant?: "primary" | "default" | "text";
}

/** Button component */
export const Button: FC<ButtonProps> = ({
  className,
  variant = "default",
  disabled,
  children,
  ...props
}) => {
  return (
    <HeadlessButton
      className={clsx(
        "flex items-center gap-2 whitespace-nowrap rounded border px-4 py-2 font-semibold outline-none transition-colors",

        "disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-100 disabled:text-slate-300 disabled:hover:border-slate-300 disabled:hover:text-slate-300",

        !disabled &&
          "focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50",

        variant === "primary" &&
          "border-cyan-600 bg-cyan-500 text-white shadow-sm hover:border-cyan-500 hover:bg-cyan-400",

        variant === "default" &&
          "border-slate-300 bg-white text-slate-700 shadow-sm hover:border-cyan-500 hover:text-cyan-500",

        variant === "text" &&
          "border-transparent bg-transparent text-slate-700 shadow-none hover:bg-white hover:bg-opacity-50 hover:text-cyan-500 focus:border-transparent focus:text-cyan-500 focus:ring-transparent",

        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </HeadlessButton>
  );
};
