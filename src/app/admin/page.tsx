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

      <div className="flex gap-4">
        <LinkButton href="/admin/posts">
          <DocumentIcon className="size-6" />
          Записи
        </LinkButton>

        <LinkButton href="/admin/settings">
          <Cog6ToothIcon className="size-6" />
          Настройки
        </LinkButton>
      </div>
    </>
  );
}

export const metadata: Metadata = {
  title: "Администрирование",
};
