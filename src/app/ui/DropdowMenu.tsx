// Lib
// -----------------------------------------------------------------------------
import { FC, ReactNode } from "react";
import { Button } from "@headlessui/react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

// Types
// -----------------------------------------------------------------------------
interface DropdownMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

// Props
// -----------------------------------------------------------------------------
export interface DropdownMenuProps {
  items: DropdownMenuItem[];
}

/** Dropdown menu component */
export const DropdownMenu: FC<DropdownMenuProps> = ({ items }) => {
  return (
    <Menu>
      <MenuButton className="inline-flex rounded bg-transparent p-1 text-slate-700 data-[hover]:bg-white data-[open]:bg-white data-[hover]:bg-opacity-50 data-[open]:bg-opacity-50 data-[hover]:text-teal-500 data-[open]:text-teal-500">
        <EllipsisHorizontalIcon className="size-6" />
      </MenuButton>

      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className="rounded bg-white p-1 text-sm shadow-lg"
        >
          {items.map((item) => {
            return (
              <MenuItem key={item.label}>
                <Button
                  className="inline-flex items-center gap-2 rounded bg-transparent px-2 py-1 text-slate-700 hover:text-teal-500"
                  onClick={item.onClick}
                  disabled={item.disabled}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </MenuItem>
            );
          })}
        </MenuItems>
      </Transition>
    </Menu>
  );
};
