import { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import PayConnectProviderList from "../components/PayConnectProviderList";

export const metadata: Metadata = {
  title: 'Local & Cross-Border Remittance | PayConnect | My Services | T+',
}

export default async function LocalCrossBorderRemittancePage() {
  await requireAuth();
  
  return <PayConnectProviderList 
    modalNode="pages.payConnect.localCrossBorderRemittance" 
    iconName="plane"
    iconSize={24}
    iconVariant="blue-gradient"
  />
}
