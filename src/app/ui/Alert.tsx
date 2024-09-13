// Lib
// -----------------------------------------------------------------------------
import { FC, ReactNode } from "react";
import { clsx } from "clsx";

// Props
// -----------------------------------------------------------------------------
export type AlertProps = {
  status: "success" | "warning" | "error";
  children: ReactNode;
  className?: string;
};

/** Field error component */
export const Alert: FC<AlertProps> = ({ status, children, className }) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-4 rounded px-4 py-2 shadow",

        status === "success" && "bg-green-200 text-green-700",

        status === "warning" && "bg-yellow-200 text-yellow-700",

        status === "error" && "bg-red-200 text-red-700",

        className,
      )}
    >
      {children}
    </div>
  );
};
