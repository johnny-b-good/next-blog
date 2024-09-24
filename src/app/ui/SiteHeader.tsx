// Lib
// -----------------------------------------------------------------------------
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";

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
import { SiteMenu } from "./SiteMenu";

// Props
// -----------------------------------------------------------------------------
export type SiteHeaderProps = {
  siteName: string;
};

export const SiteHeader = async ({ siteName }: SiteHeaderProps) => {
  const session = await auth();

  // const menuItems: DropdownMenuProps["items"] = [
  //   {
  //     key: "admin",
  //     // label: <Link href="/admin">Админ</Link>,
  //     label: "Админ",
  //     icon: <Cog6ToothIcon className="size-6" />,
  //   },
  // ];

  // if (session?.user) {
  //   menuItems.push({
  //     key: "logout",
  //     // label: <div onClick={logout}>Выйти</div>,
  //     label: "Выйти",
  //     icon: <ArrowRightStartOnRectangleIcon className="size-6" />,
  //   });
  // }

  // const onMenuClick = (key: string | number) => {
  //   if (key === "admin") {
  //     redirect("/admin");
  //   } else if (key === "logout") {
  //     logout();
  //   }
  // };

  // <form action={logout}>
  //   <Button type="submit" variant="text">
  //     <ArrowRightStartOnRectangleIcon className="size-6" />
  //     Выйти
  //   </Button>
  // </form>

  return (
    <header className="sticky top-0 border-t-4 border-orange-500 bg-white py-4 shadow-md">
      <div className="mx-auto flex max-w-4xl items-center gap-4 px-10">
        <h1>
          <Link className="text-2xl font-semibold no-underline" href="/">
            {siteName}
          </Link>
        </h1>

        <div className="flex-grow"></div>

        <SiteMenu hasUser={Boolean(session?.user)} />
      </div>
    </header>
  );
};
