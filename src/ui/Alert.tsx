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
        "flex items-center gap-4 rounded border px-4 py-2 shadow-sm",

        status === "success" && "border-green-300 bg-green-100 text-green-700",

        status === "warning" &&
          "border-yellow-300 bg-yellow-100 text-yellow-700",

        status === "error" && "border-red-300 bg-red-100 text-red-700",

        className,
      )}
    >
      {children}
    </div>
  );
};
