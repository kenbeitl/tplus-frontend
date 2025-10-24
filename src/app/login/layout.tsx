import type { Metadata } from "next";
import "@/globals.css";

export const metadata: Metadata = {
  title: "TPlus Login - Authentication",
  description: "Secure login portal for TPlus application",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}