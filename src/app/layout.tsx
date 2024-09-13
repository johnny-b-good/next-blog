import "./globals.css";

import { SiteHeader } from "./ui";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="bg-slate-50 text-slate-700">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
