import { Metadata } from "next";
import BizConnectClient from "./BizConnectClient";

export const metadata: Metadata = {
  title: 'BizConnect | Services | TPlus',
}

export default function BizConnect() {
  return <BizConnectClient />;
}
