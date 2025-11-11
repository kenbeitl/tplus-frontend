import { Metadata } from "next";
import SettingsClient from "./SettingsClient";

export const metadata: Metadata = {
  title: 'Settings | TPlus',
}

export default function Settings() {
  return <SettingsClient />
}
