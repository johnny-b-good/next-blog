import { FC } from "react";
import { clsx } from "clsx";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Link } from "./Link";

export type BreadcrumbsProps = {
  className?: string;
  parts: Array<{
    text: string;
    url?: string;
  }>;
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ className, parts }) => {
  return (
    <div className={clsx("flex flex-wrap gap-2", className)}>
      <Link href={"/"}>
        <HomeIcon className="h-6 w-6" />
      </Link>

      <span className="">/</span>
      {parts.map(({ text, url }, index) => (
        <>
          {url ? <Link href={url}>{text}</Link> : <span>{text}</span>}

          {index !== parts.length - 1 && <span className="">/</span>}
        </>
      ))}
    </div>
  );
};
