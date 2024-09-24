"use client";

// Lib
// -----------------------------------------------------------------------------
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

// App
// -----------------------------------------------------------------------------
import {
  Link,
  Button,
  LinkButton,
  DropdownMenu,
  DropdownMenuProps,
} from "@/ui";
import { logout } from "@/lib/actions";
import { auth } from "@/auth";

// Props
// -----------------------------------------------------------------------------
export type SiteMenuProps = { hasUser: boolean };

export const SiteMenu = ({ hasUser }: SiteMenuProps) => {
  const { replace } = useRouter();

  const menuItems: DropdownMenuProps["items"] = [
    {
      key: "admin",
      label: "Админ",
      icon: <Cog6ToothIcon className="size-6" />,
    },
  ];

  if (hasUser) {
    menuItems.push({
      key: "logout",
      label: "Выйти",
      icon: <ArrowRightStartOnRectangleIcon className="size-6" />,
    });
  }

  const onMenuClick = (key: string | number) => {
    if (key === "admin") {
      replace("/admin");
    } else if (key === "logout") {
      logout();
    }
  };

  return (
    <DropdownMenu variant="burger" items={menuItems} onClick={onMenuClick} />
  );
};
