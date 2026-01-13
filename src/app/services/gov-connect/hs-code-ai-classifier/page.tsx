import { Metadata } from "next";
import HSCodeAIClassifierClient from "./HSCodeAIClassifierClient";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'HS Code AI Classifier | GovConnect | My Services | T+',
}

export default async function HSCodeAIClassifierPage() {
  await requireAuth();
  
  return <HSCodeAIClassifierClient />;
}
