import dayjs from "dayjs";
import "dayjs/locale/ru";

import "./globals.css";

dayjs.locale("ru");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="border-t-4 border-solid border-orange-500 bg-slate-50 text-slate-700">
      <body>{children}</body>
    </html>
  );
}
