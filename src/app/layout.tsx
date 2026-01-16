"use client"
import "./globals.css";
import { AppProviders } from "@/src/providers/providers";
import { SessionProvider } from "next-auth/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider >
          <AppProviders>{children}</AppProviders>
        </SessionProvider>
      </body>
    </html>
  );
}
