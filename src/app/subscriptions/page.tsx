import { Metadata } from "next";
import SubscriptionsClient from "./SubscriptionsClient";

export const metadata: Metadata = {
  title: 'Subscriptions | TPlus',
}

export default function Subscriptions() {
  return <SubscriptionsClient />;
}
