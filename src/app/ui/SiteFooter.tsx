// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";

export type SiteFooterProps = {
  copyright: string;
};

export const SiteFooter: FC<SiteFooterProps> = ({ copyright }) => {
  return (
    <footer className="sticky bottom-0 flex items-center border-b-4 border-cyan-500 bg-white px-6 py-4 shadow-md">
      © {copyright}
    </footer>
  );
};
