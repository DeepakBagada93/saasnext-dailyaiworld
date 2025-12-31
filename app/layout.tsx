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
  metadataBase: new URL("https://dailyaiworld.com"),
  title: {
    default: "Daily AI World | AI Business, Design & Future Trends",
    template: "%s | Daily AI World",
  },
  description:
    "Your daily source for Artificial Intelligence, Business, Design, and Future Trends. Stay ahead with curated insights and in-depth analysis.",
  keywords: [
    "Artificial Intelligence",
    "AI Business",
    "Future Trends",
    "AI Design",
    "Tech News",
    "Machine Learning",
  ],
  authors: [{ name: "Daily AI World Team" }],
  creator: "Daily AI World",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dailyaiworld.com",
    title: "Daily AI World | AI Business, Design & Future Trends",
    description:
      "Your daily source for Artificial Intelligence, Business, Design, and Future Trends. Stay ahead with curated insights and in-depth analysis.",
    siteName: "Daily AI World",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Daily AI World",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily AI World | AI Business, Design & Future Trends",
    description:
      "Your daily source for Artificial Intelligence, Business, Design, and Future Trends. Stay ahead with curated insights and in-depth analysis.",
    images: ["/opengraph-image"],
    creator: "@dailyaiworld",
  },
  icons: {
    icon: [
      { url: "/siteicon.png" },
      { url: "/siteicon.png", sizes: "32x32", type: "image/png" },
      { url: "/siteicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/siteicon.png" },
      { url: "/siteicon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/siteicon.png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "2HM5ZCkGPsguomKQTIOEw-Qolttb8UQezIMR04SwR4c",
  },
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
