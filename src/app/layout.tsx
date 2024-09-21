import type { Metadata } from "next";

import { getSettings } from "@/lib/queries";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/app/ui";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { siteName, copyright } = await getSettings();

  return (
    <html className="min-h-screen bg-slate-50 text-slate-700">
      <body className="bg-pattern-morphing-diamonds grid min-h-screen grid-rows-[min-content_1fr_min-content] items-stretch bg-fixed">
        <SiteHeader siteName={siteName} />

        <main>
          <div className="mx-auto max-w-4xl px-4 py-8">{children}</div>
        </main>

        <SiteFooter copyright={copyright} />
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const { siteName } = await getSettings();

  return {
    title: {
      template: `%s :: ${siteName}`,
      default: siteName,
    },
  };
}
