import { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import PayConnectProviderList from "../components/PayConnectProviderList";

export const metadata: Metadata = {
  title: 'Bank Account Opening | PayConnect | Services | T+',
}

export default async function BankAccountOpeningPage() {
  await requireAuth();
  
  return <PayConnectProviderList 
    modalNode="pages.payConnect.bankAccountOpening" 
    iconName="building2"
    iconSize={18}
    iconVariant="blue-gradient"
    providerEmoji="🏦"
  />;
}
