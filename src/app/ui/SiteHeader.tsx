// Lib
// -----------------------------------------------------------------------------
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

// App
// -----------------------------------------------------------------------------
import { Link, Button, LinkButton } from "@/ui";
import { logout } from "@/lib/actions";
import { auth } from "@/auth";

// Props
// -----------------------------------------------------------------------------
export type SiteHeaderProps = {
  siteName: string;
};

export const SiteHeader = async ({ siteName }: SiteHeaderProps) => {
  const session = await auth();

  return (
    <header className="sticky top-0 border-t-4 border-solid border-orange-500 bg-white py-4 shadow-md">
      <div className="mx-auto flex max-w-4xl items-center gap-4 px-10">
        <h1>
          <Link className="text-2xl font-semibold no-underline" href="/">
            {siteName}
          </Link>
        </h1>

        <div className="flex-grow"></div>

        <LinkButton href="/admin" variant="text">
          <Cog6ToothIcon className="size-6" />
          Админ
        </LinkButton>

        {session?.user && (
          <form action={logout}>
            <Button type="submit" variant="text">
              <ArrowRightStartOnRectangleIcon className="size-6" />
              Выйти
            </Button>
          </form>
        )}
      </div>
    </header>
  );
};
