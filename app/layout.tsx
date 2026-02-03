import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
  
export const metadata: Metadata = {
  title: "InventrAI - Find Your Next Winning Product",
  description: "AI-powered product screener that helps you discover trending products across Amazon, AliExpress, and Google SEO. Find your next inventory before the competition.",
  keywords: ["product research", "inventory", "Amazon", "AliExpress", "trending products", "ecommerce"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} font-sans antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
