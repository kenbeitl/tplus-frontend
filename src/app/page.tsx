import { Metadata } from "next";
import SignInClient from "./sign-in/SignInClient";

export const metadata: Metadata = {
  title: "Sign In | TPlus",
  description: "Secure sign in portal for TPlus application",
};

export default function RootLogin() {
  return <SignInClient />;
}
