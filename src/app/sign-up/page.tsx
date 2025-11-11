import { Metadata } from "next";
import LoginClient from "../login/LoginClient";

export const metadata: Metadata = {
  title: "Sign Up | TPlus",
  description: "Create your TPlus account",
}

export default function SignUp() {
  return <LoginClient />;
}
