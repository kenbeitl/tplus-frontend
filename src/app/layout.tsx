'use client';

import "@/globals.css";
import { Roboto } from "next/font/google";
import MUIThemeProvider from "@/layout/MUIThemeProvider";
import AuthWrapper from "@/layout/AuthWrapper";
import AppWrapper from "@/layout/AppWrapper";
import { usePathname } from "next/navigation";
import { AppProvider } from "@/contexts/AppContext";
import { SnackbarProvider } from "@/contexts/SnackbarContext";
import { SessionProvider } from "next-auth/react";
import { Box } from "@mui/material";
import theme from "@/theme/theme";

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
  const isAuth = pathname === '/' || pathname.includes('/login') || pathname.includes('/sign-in') || pathname.includes('/sign-up') || pathname.includes('/auth');

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <SessionProvider>
          <AppProvider>
            <SnackbarProvider>
              <MUIThemeProvider>
                {isAuth ? (
                  <AuthWrapper>{children}</AuthWrapper>
                ) : (
                  <AppWrapper>
                    <Box component="div" className={`p-4 sm:p-6 ${theme.palette.gradientClasses.slateBlueIndigoLight}`}>{children}</Box>
                  </AppWrapper>
                )}
              </MUIThemeProvider>
            </SnackbarProvider>
          </AppProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
