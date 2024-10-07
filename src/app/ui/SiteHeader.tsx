// App
// -----------------------------------------------------------------------------
import { Link } from "@/ui";

import { auth } from "@/auth";
import { SiteMenu } from "./SiteMenu";

// Props
// -----------------------------------------------------------------------------
export type SiteHeaderProps = {
  siteName: string;
};

export const SiteHeader = async ({ siteName }: SiteHeaderProps) => {
  const session = await auth();

  return (
    <header className="sticky top-0 flex items-center gap-4 border-t-4 border-orange-500 bg-white px-6 py-4 shadow-md">
      <h1>
        <Link className="text-2xl font-semibold no-underline" href="/">
          {siteName}
        </Link>
      </h1>

      <div className="flex-grow"></div>

      <SiteMenu hasUser={Boolean(session?.user)} />
    </header>
  );
};
