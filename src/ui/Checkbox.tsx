// Lib
// -----------------------------------------------------------------------------
import {
  Checkbox as HeadlessCheckbox,
  CheckboxProps as HeadlessCheckboxProps,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { clsx } from "clsx";

/** Checkbox component */
export const Checkbox = ({ className, ...props }: HeadlessCheckboxProps) => {
  return (
    <HeadlessCheckbox
      className={clsx(
        "group inline-flex size-6 cursor-pointer items-center rounded border border-slate-300 bg-white text-cyan-500 shadow-sm outline-none transition-colors",
        "data-[focus]:border-cyan-300 data-[focus]:ring data-[focus]:ring-cyan-200 data-[focus]:ring-opacity-50 data-[focus]:ring-offset-0",
        className,
      )}
      {...props}
    >
      <CheckIcon
        className="stoke-2 size-6 opacity-0 transition group-data-[checked]:opacity-100"
        strokeWidth={2}
      />
    </HeadlessCheckbox>
  );
};
