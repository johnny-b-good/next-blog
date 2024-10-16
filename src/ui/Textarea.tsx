// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import {
  Textarea as HeadlessTextarea,
  TextareaProps as HeadlessTextareaProps,
} from "@headlessui/react";
import { clsx } from "clsx";

// Props
// -----------------------------------------------------------------------------
export type TextareaProps = HeadlessTextareaProps;

/** Textarea component */
export const Textarea: FC<TextareaProps> = ({
  className,
  children,

  ...props
}) => {
  return (
    <HeadlessTextarea
      className={clsx(
        "block w-full rounded border border-slate-300 px-4 py-2 shadow-sm outline-none transition-colors placeholder:text-slate-300",
        "focus:border-cyan-300 focus:ring focus:ring-cyan-200 focus:ring-opacity-50",
        "data-[invalid]:border-red-300 data-[invalid]:focus:border-red-500 data-[invalid]:focus:ring-red-200",
        className,
      )}
      {...props}
    >
      {children}
    </HeadlessTextarea>
  );
};
