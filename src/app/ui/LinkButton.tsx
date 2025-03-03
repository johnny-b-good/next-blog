import {
  LinkButton as SUILinkButton,
  LinkButtonProps as SUILinkButtonProps,
} from "@something-ui/components";
import NextLink from "next/link";

export type LinkButtonProps = Omit<SUILinkButtonProps, "href"> & {
  href: string;
};

export function LinkButton({ children, href, ...other }: LinkButtonProps) {
  return (
    <SUILinkButton asChild {...other}>
      <NextLink href={href}>{children}</NextLink>
    </SUILinkButton>
  );
}

