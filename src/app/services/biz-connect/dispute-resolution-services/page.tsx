import { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import BizConnectProviderList from "../components/BizConnectProviderList";

export const metadata: Metadata = {
  title: 'Dispute Resolution Services | BizConnect | My Services | T+',
}

export default async function DisputeResolutionServicesPage() {
  await requireAuth();
  
  return <BizConnectProviderList 
    modalNode="pages.bizConnect.disputeResolutionServices"
    iconName="scale"
    iconSize={32}
    variant="orange-gradient"
  />;
}
