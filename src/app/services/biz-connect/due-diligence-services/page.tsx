import { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import BizConnectProviderList from "../components/BizConnectProviderList";

export const metadata: Metadata = {
  title: 'Due Diligence Services | BizConnect | My Services | T+',
}

export default async function DueDiligenceServicesPage() {
  await requireAuth();
  
  return <BizConnectProviderList 
    modalNode="pages.bizConnect.dueDiligenceServices"
    iconName="file-check"
    iconSize={32}
    variant="purple-gradient"
  />;
}
