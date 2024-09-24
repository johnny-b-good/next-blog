export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="rounded bg-white px-6 py-4 shadow">{children}</div>;
}
