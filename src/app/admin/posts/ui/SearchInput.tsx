"use client";

// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

// App
// -----------------------------------------------------------------------------
import { Input, InputProps } from "@/ui/Input";

// Props
// -----------------------------------------------------------------------------
export type SearchInputProps = Omit<
  InputProps,
  "onChange" | "value" | "defaultValue"
>;

/** Search input component */
export const SearchInput: FC<SearchInputProps> = (props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      onChange={(ev) => {
        handleSearch(ev.target.value);
      }}
      defaultValue={searchParams.get("query")?.toString()}
      {...props}
    />
  );
};
