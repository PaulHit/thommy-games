import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "@/components/layout/RootLayoutClient";

// latin-ext carries the Romanian diacritics (ă, ș, ț) — without it they are
// fetched late and render in a fallback font mid-word.
const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thommy Games — Închirieri jocuri pentru evenimente",
  description:
    "Transformă-ți evenimentul într-o experiență memorabilă. Închiriem jocuri mari, din lemn și materiale premium, pentru nunți, petreceri private și evenimente corporate.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <RootLayoutClient>{children}</RootLayoutClient>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
