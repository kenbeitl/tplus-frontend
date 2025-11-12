import { Metadata } from "next";
import LoginClient from "./login/LoginClient";

export const metadata: Metadata = {
  title: "Login | TPlus",
  description: "Secure login portal for TPlus application",
};

export default function RootLogin() {
  return <LoginClient />;
}
