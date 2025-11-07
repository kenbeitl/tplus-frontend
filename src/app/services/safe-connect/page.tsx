import { Metadata } from "next";
import SafeConnectClient from "./SafeConnectClient";

export const metadata: Metadata = {
  title: 'SafeConnect | Services | TPlus',
}

export default function SafeConnect() {

  return (
   <SafeConnectClient />
  );
}
