import { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: 'Login | TPlus',
}

export default async function Login() {
  return <LoginClient />;
}
