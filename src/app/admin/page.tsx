// Lib
// -----------------------------------------------------------------------------
import { Cog6ToothIcon, DocumentIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";

// App
// -----------------------------------------------------------------------------
import { Breadcrumbs, LinkButton } from "@/ui";

export default async function AdminPage() {
  return (
    <>
      <Breadcrumbs className="mb-8" parts={[{ text: "Администрирование" }]} />

      <div className="flex gap-8">
        <LinkButton href="/admin/posts" className="px-16 py-12 text-2xl">
          <DocumentIcon className="size-8" />
          Записи
        </LinkButton>

        <LinkButton href="/admin/settings" className="px-16 py-12 text-2xl">
          <Cog6ToothIcon className="size-8" />
          Настройки
        </LinkButton>
      </div>
    </>
  );
}

export const metadata: Metadata = {
  title: "Администрирование",
};
