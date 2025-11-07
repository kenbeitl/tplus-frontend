import { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: 'Dashboard | TPlus',
}

export default function Dashboard() {
  
  return (
    <DashboardClient />
  );
}
