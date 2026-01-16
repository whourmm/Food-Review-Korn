import "./globals.css";
import { AppProviders } from "@/src/providers/providers";
import { Noto_Sans_Thai } from "next/font/google";


const notoSansThai = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  variable: "--font-noto-sans-thai",

  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={notoSansThai.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
