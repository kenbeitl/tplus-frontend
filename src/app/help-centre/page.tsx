import { Metadata } from "next";
import HelpCentreClient from "./HelpCentreClient";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'Help Centre | T+',
}

export default async function HelpCentre() {
  await requireAuth();
  
  return <HelpCentreClient />;
}
