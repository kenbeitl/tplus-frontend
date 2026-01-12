import { Metadata } from "next";

import { requireAuth } from "@/lib/auth";
import PayConnectProviderList from "../components/PayConnectProviderList";
import { getSVGIcon } from "@/helpers/utils";

export const metadata: Metadata = {
  title: 'Local & Cross-Border Remittance | PayConnect | Services | T+',
}

export default async function LocalCrossBorderRemittancePage() {
  await requireAuth();
  
  return <PayConnectProviderList 
    modalNode="pages.payConnect.localCrossBorderRemittance" 
    icon={ getSVGIcon('plane', 24) }
    providerEmoji="🌐"
  />;
}
