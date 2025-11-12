'use client';

import { Roboto } from "next/font/google";
import "@/globals.css";
import MUIThemeProvider from "@/layout/MUIThemeProvider";
import AuthWrapper from "@/layout/AuthWrapper";
import AppWrapper from "@/layout/AppWrapper";
import { usePathname } from "next/navigation";
import { AppProvider } from "@/contexts/AppContext";

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
  const isAuth = pathname === '/' || pathname.includes('/login') || pathname.includes('/sign-up') || pathname.includes('/register') || pathname.includes('/auth');

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <AppProvider>
          <MUIThemeProvider>
            {isAuth ? (
              <AuthWrapper>{children}</AuthWrapper>
            ) : (
              <AppWrapper>
                <div className="p-4 sm:p-6">{children}</div>
              </AppWrapper>
            )}
          </MUIThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
