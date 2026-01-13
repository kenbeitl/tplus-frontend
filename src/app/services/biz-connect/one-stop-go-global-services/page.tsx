import { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import BizConnectProviderList from "../components/BizConnectProviderList";

export const metadata: Metadata = {
  title: 'One-stop Go Global Services | BizConnect | My Services | T+',
}

export default async function OneStopGoGlobalServicesPage() {
  await requireAuth();
  
  return <BizConnectProviderList 
    modalNode="pages.bizConnect.oneStopGoGlobalServices"
    iconName="globe"
    iconSize={32}
    variant="green-gradient"
  />;
}
