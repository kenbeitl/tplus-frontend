'use client';

import { Roboto } from "next/font/google";
import "@/globals.css";
import MUIThemeProvider from "@/layout/MUIThemeProvider";
import AuthWrapper from "@/layout/AuthWrapper";
import AppWrapper from "@/layout/AppWrapper";
import { usePathname } from "next/navigation";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuth = pathname.includes('/login') || pathname.includes('/register') || pathname.includes('/auth');

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <MUIThemeProvider>
          {isAuth ? (
            <AuthWrapper>{children}</AuthWrapper>
          ) : (
            <AppWrapper>{children}</AppWrapper>
          )}
        </MUIThemeProvider>
      </body>
    </html>
  );
}
