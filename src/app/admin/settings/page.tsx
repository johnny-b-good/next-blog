// App
// -----------------------------------------------------------------------------
import { Breadcrumbs } from "@/ui";
import { SettingsForm } from "./ui";
import { getSettings } from "@/lib/queries";
import { updateSettings } from "@/lib/actions";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <>
      <Breadcrumbs
        className="mb-8"
        parts={[
          { text: "Администрирование", url: "/admin" },
          { text: "Настройки" },
        ]}
      />

      <SettingsForm settings={settings} action={updateSettings} />
    </>
  );
}
