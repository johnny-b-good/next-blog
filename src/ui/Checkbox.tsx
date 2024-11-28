// Lib
// -----------------------------------------------------------------------------
import {
  Checkbox as HeadlessCheckbox,
  CheckboxProps as HeadlessCheckboxProps,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { clsx } from "clsx";

// Props
// -----------------------------------------------------------------------------
type CheckboxProps = HeadlessCheckboxProps & {
  size?: "4" | "6";
};

/** Checkbox component */
export const Checkbox = ({ className, size, ...props }: CheckboxProps) => {
  return (
    <HeadlessCheckbox
      className={clsx(
        "group inline-flex cursor-pointer items-center rounded border border-slate-300 bg-white text-cyan-500 shadow-sm outline-none transition-colors",
        size === "4" ? "size-4" : "size-6",
        "data-[focus]:border-cyan-300 data-[focus]:ring data-[focus]:ring-cyan-200 data-[focus]:ring-opacity-50 data-[focus]:ring-offset-0",
        className,
      )}
      {...props}
    >
      <CheckIcon
        className={clsx(
          "stoke-2 opacity-0 transition group-data-[checked]:opacity-100",
          size === "4" ? "size-4" : "size-6",
        )}
        strokeWidth={2}
      />
    </HeadlessCheckbox>
  );
};
