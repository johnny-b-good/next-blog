export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto my-8 max-w-5xl">
      <div className="mb-8 text-2xl font-semibold">Панель управления</div>
      {children}
    </div>
  );
}
