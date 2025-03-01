"use client";

// Lib
// -----------------------------------------------------------------------------
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuProps } from "@something-ui/components";

// App
// -----------------------------------------------------------------------------
import { logout } from "@/lib/actions";
import { authClient } from "@/lib/authClient";

// Consts
// -----------------------------------------------------------------------------
const { useSession } = authClient;
export const SiteMenu = () => {
  const session = useSession();
  const { replace } = useRouter();

  const menuItems: DropdownMenuProps["items"] = [
    {
      key: "admin",
      label: "Админ",
      icon: <Cog6ToothIcon className="size-6" />,
    },
  ];

  if (session.data) {
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
