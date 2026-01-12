import { Metadata } from "next";

import { requireAuth } from "@/lib/auth";
import PayConnectProviderList from "../components/PayConnectProviderList";
import { getSVGIcon } from "@/helpers/utils";

export const metadata: Metadata = {
  title: 'Trade Financing | PayConnect | Services | T+',
}

export default async function TradeFinancingPage() {
  await requireAuth();
  
  return <PayConnectProviderList 
    modalNode="pages.payConnect.tradeFinancing" 
    icon={ getSVGIcon('dollar-sign', 36) }
    providerEmoji="🏛️"
  />;
}
