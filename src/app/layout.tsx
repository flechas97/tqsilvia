import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../comps/Header";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Álbum de Recuerdos Silvia y Roberto",
  description: "Con amor, Silvia y Roberto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header />
      <main>
        {children}
      </main>
      <Analytics/>
        </body>
    </html>
  );
}
