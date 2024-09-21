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
    <header className="sticky top-0 border-t-4 border-solid border-orange-500 bg-white py-4 shadow-lg">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-8">
        <h1>
          <Link className="text-2xl font-semibold no-underline" href="/">
            {siteName}
          </Link>
        </h1>

        <div className="flex-grow"></div>

        <LinkButton href="/admin" variant="text">
          <Cog6ToothIcon className="h-6 w-6" />
          Админ
        </LinkButton>

        {session?.user && (
          <form action={logout}>
            <Button type="submit" variant="text">
              <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
              Выйти
            </Button>
          </form>
        )}
      </div>
    </header>
  );
};
