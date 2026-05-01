import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AICTS — Alumni Information Career Tracking System | PCLU",
    template: "%s | AICTS PCLU",
  },
  description:
    "The Alumni Information Career Tracking System (AICTS) of Polytechnic College of La Union. Track alumni career outcomes, connect with employers, and access institutional analytics.",
  keywords: [
    "PCLU",
    "Polytechnic College of La Union",
    "alumni",
    "career tracking",
    "job board",
    "AICTS",
  ],
  authors: [{ name: "Polytechnic College of La Union" }],
  creator: "PCLU",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    siteName: "AICTS PCLU",
    title: "Alumni Information Career Tracking System | PCLU",
    description:
      "Centralized alumni records, career outcomes tracking, and job connections for Polytechnic College of La Union graduates.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
