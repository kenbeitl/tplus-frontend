import { Metadata } from "next";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'Services | TPlus',
}

export default async function ServicesPage() {
  await requireAuth();

  return (
   <></>
  );
}