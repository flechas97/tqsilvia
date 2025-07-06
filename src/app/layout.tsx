import type {Metadata} from "next";
import {Inter} from "next/font/google";
import Header from "../comps/Header";
import "./globals.css";
import {Analytics} from "@vercel/analytics/react";
import {GoogleAnalytics} from "@next/third-parties/google";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Lo siento, Te Quiero Marta",
    // Álbum de Recuerdos Marta y Roberto
    // description: "Con amor, marta y Roberto",
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
                <main>{children}</main>
                <Analytics />
                <GoogleAnalytics gaId="G-EDFC79T6WZ" />
            </body>
        </html>
    );
}
