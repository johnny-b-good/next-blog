// Lib
// -----------------------------------------------------------------------------
import { ReactNode } from "react";
import { clsx } from "clsx";
import Link from "next/link";

// Props
// -----------------------------------------------------------------------------
export interface LinkListProps<T extends { id: number }> {
  items: T[];
  className?: string;
  renderItem: (item: T) => ReactNode;
  makeUrl: (item: T) => string;
}

/** Link list component */
export const LinkList = <T extends { id: number }>({
  items,
  className,
  renderItem,
  makeUrl,
}: LinkListProps<T>) => {
  return (
    <div className={clsx("border-t border-t-slate-300", className)}>
      {items.map((item) => (
        <Link
          href={makeUrl(item)}
          className={clsx(
            "flex cursor-pointer items-baseline gap-4 border-b border-b-slate-300 px-4 py-2 outline-none transition-colors",
            "hover:bg-cyan-50",
            "focus:border-cyan-300 focus:ring focus:ring-cyan-200 focus:ring-opacity-50",
          )}
          key={item.id}
        >
          {renderItem(item)}
        </Link>
      ))}

      {items.length === 0 && <div className="px-3 py-2">Список пуст</div>}
    </div>
  );
};
