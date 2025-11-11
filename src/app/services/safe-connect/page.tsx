import { Metadata } from "next";
import SafeConnectClient from "./SafeConnectClient";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'SafeConnect | Services | TPlus',
}

export default async function SafeConnect() {
  await requireAuth();

  return (
   <SafeConnectClient />
  );
}
