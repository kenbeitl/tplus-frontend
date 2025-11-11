import { Metadata } from "next";
import SubscriptionsClient from "./SubscriptionsClient";
import { requireAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'Subscriptions | TPlus',
}

export default async function Subscriptions() {
  await requireAuth();
  
  return <SubscriptionsClient />;
}
