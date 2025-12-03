import { Metadata } from "next";
import AIPoweredCustomsAutomationClient from "./AIPoweredCustomsAutomationClient";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'AI-Powered Customs Automation | GovConnect | Services | T+',
}

export default async function AIPoweredCustomsAutomationPage() {
  await requireAuth();
  
  return <AIPoweredCustomsAutomationClient />;
}
