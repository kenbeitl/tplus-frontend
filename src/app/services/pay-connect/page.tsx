import { Metadata } from "next";
import PayConnectClient from "./PayConnectClient";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'PayConnect | Services | T+',
}

export default async function PayConnect() {
  await requireAuth();
  
  return <PayConnectClient />;
}
