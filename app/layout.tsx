import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter ({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Santon",
  description: "Make a wish and get some STON coin!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy ="beforeInteractive"></Script>
      </head>
      <body
        className={inter.className} >{children}
      </body>
    </html>
  );
}
