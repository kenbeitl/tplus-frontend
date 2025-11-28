import { Metadata } from "next";
import DashboardClient from "./DashboardClient";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'Dashboard | T+',
}

export default async function DashboardPage() {
  await requireAuth();
  return <DashboardClient />;
}
