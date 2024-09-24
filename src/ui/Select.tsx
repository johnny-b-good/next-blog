// Lib
// -----------------------------------------------------------------------------
import { ReactNode } from "react";
import {
  Select as HeadlessSelect,
  SelectProps as HeadlessSelectProps,
} from "@headlessui/react";
import { clsx } from "clsx";

// Props
// -----------------------------------------------------------------------------
export interface SelectProps<T extends number | string>
  extends HeadlessSelectProps {
  options: { value: T; label: ReactNode }[];
}

/** Select component */
export const Select = <T extends number | string>({
  className,
  options,
  ...props
}: SelectProps<T>) => {
  return (
    <HeadlessSelect
      className={clsx(
        "block w-full cursor-pointer appearance-none rounded border border-slate-300 bg-white py-2 pl-4 pr-10 text-slate-700 shadow-sm outline-none transition-colors",
        "focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50",
        "data-[invalid]:border-red-300 data-[invalid]:focus:border-red-500 data-[invalid]:focus:ring-red-200",
        className,
      )}
      {...props}
    >
      {options.map(({ value, label }) => {
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </HeadlessSelect>
  );
};
