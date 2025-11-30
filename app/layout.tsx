import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Schema } from "@/components/seo/Schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daily AI World",
  description: "Your daily dose of AI Business, Design, and Future trends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Schema
          type="WebSite"
          data={{
            name: "Daily AI World",
            url: "https://dailyaiworld.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://dailyaiworld.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }}
        />
      </body>
    </html>
  );
}
