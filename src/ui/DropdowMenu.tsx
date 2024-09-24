"use client";

// Lib
// -----------------------------------------------------------------------------
import { ReactNode } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

// App
// -----------------------------------------------------------------------------
import { Button } from "./Button";

// Types
// -----------------------------------------------------------------------------
interface DropdownMenuItem {
  key: number | string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

// Props
// -----------------------------------------------------------------------------
export interface DropdownMenuProps {
  items: DropdownMenuItem[];
  onClick?: (key: number | string) => void;
  variant?: "dots" | "burger";
}

/** Dropdown menu component */
export const DropdownMenu = ({
  items,
  onClick,
  variant = "dots",
}: DropdownMenuProps) => {
  const menuItemsHasIcons = items.findIndex((item) => item.icon) !== -1;

  return (
    <Menu>
      <MenuButton as={Button} variant="icon">
        {variant === "dots" ? (
          <EllipsisHorizontalIcon className="size-6" />
        ) : (
          <Bars3Icon className="size-6" />
        )}
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className={clsx(
          "flex origin-top flex-col gap-2 rounded bg-white p-2 shadow-lg transition duration-200 ease-out",
          "data-[closed]:scale-95 data-[closed]:opacity-0",
        )}
        transition
      >
        {items.map((item) => {
          return (
            <MenuItem key={item.key} disabled={item.disabled}>
              <div
                className={clsx(
                  "inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded bg-transparent px-2 py-1 text-slate-700",
                  "hover:bg-cyan-50 hover:text-cyan-500",
                  "data-[disabled]:cursor-not-allowed data-[disabled]:text-slate-300",
                  "data-[disabled]:hover:bg-white data-[disabled]:hover:text-slate-300",
                )}
                onClick={() => {
                  onClick && onClick(item.key);
                }}
              >
                {menuItemsHasIcons && (
                  <div className="size-6 flex-none">{item.icon}</div>
                )}

                {item.label}
              </div>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};
