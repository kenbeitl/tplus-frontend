import { Metadata } from "next";
import GovConnectClient from "./GovConnectClient";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'GovConnect | My Services | T+',
}

export default async function GovConnect() {
  await requireAuth();
  
  return <GovConnectClient />;
}
