import { Metadata } from "next";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'Services | T+',
}

export default async function ServicesPage() {
  await requireAuth();

  return (
   <></>
  );
}