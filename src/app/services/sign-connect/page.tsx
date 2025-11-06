import { Metadata } from "next";
import SignConnectClient from "./SignConnectClient";

export const metadata: Metadata = {
  title: 'SignConnect | Services | TPlus',
}

export default function SignConnect() {
  return <SignConnectClient />;
}
