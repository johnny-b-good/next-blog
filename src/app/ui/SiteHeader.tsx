// App
// -----------------------------------------------------------------------------
import { Link } from "@/ui";

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 border-t-4 border-solid border-orange-500 bg-white py-4 shadow-lg">
      <div className="mx-auto flex max-w-5xl items-center px-8">
        <h1>
          <Link className="text-2xl font-semibold no-underline" href="/">
            Next Blog
          </Link>
        </h1>

        <div className="flex-1"></div>

        <Link href="/admin" className="justify-self-end">
          Admin
        </Link>
      </div>
    </header>
  );
};
