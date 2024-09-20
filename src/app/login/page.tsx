// Lib
// -----------------------------------------------------------------------------
import type { Metadata } from "next";

// App
// -----------------------------------------------------------------------------
import { LoginForm } from "./ui";
import { login } from "@/lib/actions";

export default async function AdminSettingsPage() {
  return <LoginForm action={login} />;
}

export const metadata: Metadata = {
  title: "Вход",
};
