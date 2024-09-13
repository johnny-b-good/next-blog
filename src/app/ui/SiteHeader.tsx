import { Link } from "./Link";

export const SiteHeader = () => {
  return (
    <div className="sticky top-0 border-t-4 border-solid border-orange-500 bg-white py-4 text-cyan-500 shadow-lg">
      <div className="mx-auto flex max-w-5xl items-center px-4">
        <Link className="text-2xl font-semibold no-underline" href="/">
          Next Blog
        </Link>

        <div className="flex-1"></div>

        <Link href="/admin" className="justify-self-end">
          Admin
        </Link>
      </div>
    </div>
  );
};
