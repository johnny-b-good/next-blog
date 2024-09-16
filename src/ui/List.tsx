// Lib
// -----------------------------------------------------------------------------
import { ReactNode } from "react";
import { clsx } from "clsx";

// Props
// -----------------------------------------------------------------------------
export interface ListProps<T extends { id: number }> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  listClassName?: string;
  itemClassName?: string;
  emptyMessage?: ReactNode;
}

/** List component */
export const List = <T extends { id: number }>({
  items,
  renderItem,
  listClassName,
  itemClassName,
  emptyMessage = "Список пуст",
}: ListProps<T>) => {
  return (
    <div className={clsx("rounded bg-white text-sm shadow", listClassName)}>
      {items.map((item, index) => (
        <div
          className={clsx(
            "flex cursor-pointer px-4 py-2 text-sm transition-colors hover:bg-slate-50",

            index !== items.length - 1 &&
              "border-b border-solid border-b-slate-300",

            index === 0 && "rounded-t",

            index === items.length - 1 && "rounded-b",

            itemClassName,
          )}
          key={item.id}
        >
          {renderItem(item)}
        </div>
      ))}

      {items.length === 0 && <div className="px-4 py-2">{emptyMessage}</div>}
    </div>
  );
};
