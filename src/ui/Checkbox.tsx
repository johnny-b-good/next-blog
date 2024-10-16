// Lib
// -----------------------------------------------------------------------------
import { InputHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

// Props
// -----------------------------------------------------------------------------
export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
};

/** Checkbox component */
export const Checkbox = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="checkbox"
      className={clsx(
        "size-6 cursor-pointer rounded border border-slate-300 bg-white shadow-sm outline-none transition-colors",
        "checked:border-cyan-600 checked:text-cyan-500",
        "checked:hover:border-cyan-500 checked:hover:bg-cyan-400",
        "focus:border-cyan-300 focus:ring focus:ring-cyan-200 focus:ring-opacity-50 focus:ring-offset-0",
        className,
      )}
      {...props}
    />
  );
};
