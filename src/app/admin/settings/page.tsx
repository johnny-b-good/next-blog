// App
// -----------------------------------------------------------------------------
import { Breadcrumbs } from "@/ui";

export default async function AdminSettingsPage() {
  return (
    <>
      <Breadcrumbs
        className="mb-8"
        parts={[
          { text: "Администрирование", url: "/admin" },
          { text: "Настройки" },
        ]}
      />
    </>
  );
}
