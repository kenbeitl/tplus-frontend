import { Metadata } from "next";
import BizConnectClient from "./BizConnectClient";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'BizConnect | Services | TPlus',
}

export default async function BizConnect() {
  await requireAuth();
  
  return <BizConnectClient />;
}
