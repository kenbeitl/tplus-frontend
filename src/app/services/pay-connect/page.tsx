import { Metadata } from "next";
import PayConnectClient from "./PayConnectClient";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'PayConnect | Services | TPlus',
}

export default async function PayConnect() {
  await requireAuth();
  
  return <PayConnectClient />;
}
