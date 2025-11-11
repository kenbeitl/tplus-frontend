import { Metadata } from "next";
import SettingsClient from "./SettingsClient";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'Settings | TPlus',
}

export default async function Settings() {
  await requireAuth();
  
  return <SettingsClient />
}
