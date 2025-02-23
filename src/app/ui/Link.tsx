import {
  Link as SUILink,
  LinkProps as SUILinkProps,
} from "@something-ui/components";
import NextLink from "next/link";

export type LinkProps = Omit<SUILinkProps, "href"> & {
  href: string;
};

export function Link({ children, href, ...other }: LinkProps) {
  return (
    <SUILink asChild {...other}>
      <NextLink href={href}>{children}</NextLink>
    </SUILink>
  );
}
