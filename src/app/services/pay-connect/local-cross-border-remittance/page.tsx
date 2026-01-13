import { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import PayConnectProviderList from "../components/PayConnectProviderList";

export const metadata: Metadata = {
  title: 'Local & Cross-Border Remittance | PayConnect | Services | T+',
}

export default async function LocalCrossBorderRemittancePage() {
  await requireAuth();
  
  return <PayConnectProviderList 
    modalNode="pages.payConnect.localCrossBorderRemittance" 
    iconName="plane"
    iconSize={18}
    iconVariant="blue-gradient"
    providerEmoji="🌐"
  />;
}
