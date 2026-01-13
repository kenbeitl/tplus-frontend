import { Metadata } from "next";
import SignConnectClient from "./SignConnectClient";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'SignConnect | My Services | T+',
}

export default async function SignConnect() {
  await requireAuth();
  
  return <SignConnectClient />;
}
