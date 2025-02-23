// Lib
// -----------------------------------------------------------------------------
import type { Metadata } from "next";

// App
// -----------------------------------------------------------------------------
import { SettingsForm } from "./ui";
import { getSettings } from "@/lib/queries";
import { updateSettings } from "@/lib/actions";
import { Breadcrumbs } from "@/app/ui";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <>
      <Breadcrumbs
        className="mb-8"
        parts={[
          { content: "Администрирование", url: "/admin" },
          { content: "Настройки" },
        ]}
      />

      <SettingsForm settings={settings} action={updateSettings} />
    </>
  );
}

export const metadata: Metadata = {
  title: "Настройки",
};
