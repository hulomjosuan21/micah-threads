import type { Metadata } from "next";
import { Outfit, Sora } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Micah Threads",
  description:
    "Apparel brand where purpose meets style. Thoughtfully crafted clothing designed for comfort, confidence, and conscious living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${outfit.className} ${sora.variable} ${sora.className} antialiased`}
      >
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
