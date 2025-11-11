import { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login | TPlus",
  description: "Secure login portal for TPlus application",
}

export default function Login() {
  return <LoginClient />;
}
