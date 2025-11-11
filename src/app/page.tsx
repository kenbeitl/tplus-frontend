import { Metadata } from "next";
import DashboardClient from "./DashboardClient";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'Dashboard | TPlus',
}

export default async function Dashboard() {
  await requireAuth();
  
  return (
    <DashboardClient />
  );
}
