import type { Metadata } from "next";
import { Bebas_Neue, Syne, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GOPIPRAKAN | AI & Data Science Engineer",
  description: "Personal engineering console of Gopiprakan. AI & Data Science Engineer & Founder of ZARO. Building high-performance data systems and custom full-stack solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${syne.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-brand-bg text-brand-text font-sans">
        {children}
      </body>
    </html>
  );
}
