// Lib
// -----------------------------------------------------------------------------
import { CogIcon, DocumentIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";

// App
// -----------------------------------------------------------------------------
import { Breadcrumbs, LinkCard } from "@/ui";

export default async function AdminPage() {
  return (
    <>
      <Breadcrumbs className="mb-8" parts={[{ text: "Администрирование" }]} />

      <div className="flex gap-8">
        <LinkCard url="/admin/posts">
          <DocumentIcon className="h-8 w-8" />
          Записи
        </LinkCard>

        <LinkCard url="/admin/settings">
          <CogIcon className="h-8 w-8" />
          Настройки
        </LinkCard>
      </div>
    </>
  );
}

export const metadata: Metadata = {
  title: "Администрирование",
};
