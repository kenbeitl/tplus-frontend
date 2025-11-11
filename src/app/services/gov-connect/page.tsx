import { Metadata } from "next";
import GovConnectClient from "./GovConnectClient";

export const metadata: Metadata = {
  title: 'GovConnect | Services | TPlus',
}

export default function GovConnect() {  
  return <GovConnectClient />;
}
