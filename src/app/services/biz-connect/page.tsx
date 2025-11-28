import { Metadata } from "next";
import BizConnectClient from "./BizConnectClient";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'BizConnect | Services | T+',
}

export default async function BizConnect() {
  await requireAuth();
  
  return <BizConnectClient />;
}
