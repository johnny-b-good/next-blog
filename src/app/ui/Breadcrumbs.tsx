import {
  Breadcrumbs as SUIBreadcrumbs,
  BreadcrumbsProps as SUIBreadcrumbsProps,
  Link as SUILink,
} from "@something-ui/components";
import NextLink from "next/link";

export type BreadcrumbsProps = Omit<SUIBreadcrumbsProps, "renderItem">;

export function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <SUIBreadcrumbs
      {...props}
      renderItem={({ content, url }) => (
        <SUILink asChild>
          <NextLink href={url}>{content}</NextLink>
        </SUILink>
      )}
    />
  );
}
