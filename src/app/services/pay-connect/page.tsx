import { Metadata } from "next";
import PayConnectClient from "./PayConnectClient";

export const metadata: Metadata = {
  title: 'PayConnect | Services | TPlus',
}

export default function PayConnect() {
  return <PayConnectClient />;
}
