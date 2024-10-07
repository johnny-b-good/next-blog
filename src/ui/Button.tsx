// Lib
// -----------------------------------------------------------------------------
import { forwardRef, ForwardedRef } from "react";
import {
  Button as HeadlessButton,
  ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";
import { clsx } from "clsx";

// Props
// -----------------------------------------------------------------------------
export interface ButtonProps extends HeadlessButtonProps {
  variant?: "primary" | "default" | "text" | "icon";
}

/** Button component */
export const Button = forwardRef(
  (
    {
      className,
      variant = "default",
      disabled,
      children,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    return (
      <HeadlessButton
        ref={ref}
        className={clsx(
          "flex cursor-pointer items-center gap-2 whitespace-nowrap rounded border px-4 py-2 font-semibold outline-none transition-colors",
          "focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50",
          "disabled:cursor-not-allowed",

          variant === "primary" && [
            "border-cyan-600 bg-cyan-500 text-white shadow-sm",
            "hover:border-cyan-500 hover:bg-cyan-400",
          ],

          variant === "default" && [
            "border-slate-300 bg-white text-slate-700 shadow-sm",
            "hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-500",
          ],

          (variant === "primary" || variant === "default") && [
            "disabled:border-slate-300 disabled:bg-slate-100 disabled:text-slate-300",
            "disabled:hover:border-slate-300 disabled:hover:text-slate-300",
          ],

          (variant === "text" || variant === "icon") && [
            "border-transparent bg-transparent text-slate-700 shadow-none",
            "hover:bg-cyan-50 hover:text-cyan-500",
            "focus:border-transparent focus:text-cyan-500 focus:ring-transparent",
            "disabled:text-slate-300",
            "disabled:hover:bg-transparent disabled:hover:text-slate-300",
          ],

          variant === "icon" && "!p-0",

          className,
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </HeadlessButton>
    );
  },
);

Button.displayName = "Button";
