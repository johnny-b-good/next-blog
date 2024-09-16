import "./globals.css";

import { SiteHeader, SiteFooter } from "./ui";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="min-h-screen bg-slate-50 text-slate-700">
      <body className="grid min-h-screen grid-rows-[min-content_1fr_min-content] items-stretch">
        <SiteHeader />

        <main>
          <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
