// Lib
// -----------------------------------------------------------------------------
import type { Metadata } from "next";

// App
// -----------------------------------------------------------------------------
import { LoginForm } from "./ui";
import { login } from "@/lib/actions";

export default async function AdminSettingsPage() {
  return (
    <div className="mx-auto max-w-md rounded bg-white px-6 py-4 shadow">
      <LoginForm action={login} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Вход",
};
