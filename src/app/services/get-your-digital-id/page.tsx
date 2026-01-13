import { Metadata } from "next";
import GetYourDigitalIDClient from "./GetYourDigitalIDClient";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'Get Your Digital ID | My Services | T+',
}

export default async function SafeConnect() {
  await requireAuth();

  return (
    <GetYourDigitalIDClient />
  );
}
