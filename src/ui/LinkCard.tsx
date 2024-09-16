import { FC, ReactNode } from "react";
import Link from "next/link";
import { clsx } from "clsx";

export type LinkCardProps = {
  url: string;
  children: ReactNode;
};

export const LinkCard: FC<LinkCardProps> = ({ url, children }) => {
  return (
    <Link
      href={url}
      className={clsx(
        "flex flex-col items-center justify-center gap-2 rounded bg-white px-12 py-8 text-xl shadow outline-none transition-colors hover:bg-cyan-50",

        "focus:border-cyan-300 focus:ring focus:ring-cyan-200 focus:ring-opacity-50",
      )}
    >
      {children}
    </Link>
  );
};
