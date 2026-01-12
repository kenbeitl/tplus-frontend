import { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import PayConnectProviderList from "../components/PayConnectProviderList";
import { getSVGIcon } from "@/helpers/utils";

export const metadata: Metadata = {
  title: 'Bank Account Opening | PayConnect | Services | T+',
}

export default async function BankAccountOpeningPage() {
  await requireAuth();
  
  return <PayConnectProviderList 
    modalNode="pages.payConnect.bankAccountOpening" 
    icon={ getSVGIcon('building2', 36) }
    providerEmoji="🏦"
  />;
}
