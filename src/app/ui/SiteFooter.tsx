// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";

export type SiteFooterProps = {
  copyright: string;
};

export const SiteFooter: FC<SiteFooterProps> = ({ copyright }) => {
  return (
    <footer className="sticky bottom-0 border-b-4 border-solid border-cyan-500 bg-white py-4 shadow-lg">
      <div className="mx-auto flex max-w-5xl items-center px-8">
        © {copyright}
      </div>
    </footer>
  );
};
