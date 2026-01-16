import { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import PayConnectProviderList from "../components/PayConnectProviderList";

export const metadata: Metadata = {
  title: 'Bank Account Opening | PayConnect | My Services | T+',
}

export default async function BankAccountOpeningPage() {
  await requireAuth();
  
  return <PayConnectProviderList 
    modalNode="pages.payConnect.bankAccountOpening" 
    iconName="building2"
    iconSize={24}
    iconVariant="blue-gradient"
  />
}
