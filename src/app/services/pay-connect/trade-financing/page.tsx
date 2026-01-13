import { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import PayConnectProviderList from "../components/PayConnectProviderList";

export const metadata: Metadata = {
  title: 'Trade Financing | PayConnect | My Services | T+',
}

export default async function TradeFinancingPage() {
  await requireAuth();
  
  return <PayConnectProviderList 
    modalNode="pages.payConnect.tradeFinancing" 
    iconName="dollar-sign"
    iconSize={18}
    iconVariant="blue-gradient"
    providerEmoji="🏛️"
  />;
}
