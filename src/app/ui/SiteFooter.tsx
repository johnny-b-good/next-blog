// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";

export type SiteFooterProps = {
  copyright: string;
};

export const SiteFooter: FC<SiteFooterProps> = ({ copyright }) => {
  return (
    <footer className="sticky bottom-0 border-b-4 border-cyan-500 bg-white py-4 shadow-md">
      <div className="mx-auto flex max-w-4xl items-center px-10">
        © {copyright}
      </div>
    </footer>
  );
};
