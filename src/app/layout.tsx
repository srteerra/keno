import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Header } from "@/components/layout/header";
import React from "react";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { Footer } from "@/components/layout/footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700", "800"],
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://keno.vercel.app";

const DESCRIPTION =
  "Get instant AI-generated tips for Git, React, TypeScript, JavaScript, CSS, Docker and DevTools. Practical code snippets to boost your developer productivity.";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Keno — Daily AI Tips for Developers",
    template: "%s | Keno",
  },
  description: DESCRIPTION,
  keywords: [
    "developer tips",
    "programming tips",
    "AI tips for developers",
    "Git tips",
    "React tips",
    "TypeScript tips",
    "JavaScript tips",
    "CSS tips",
    "Docker tips",
    "DevTools tips",
    "coding productivity",
    "developer productivity",
    "code snippets",
  ],
  authors: [{ name: "Terra", url: "https://github.com/srteerra" }],
  creator: "Terra",
  publisher: "Keno",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Keno",
    title: "Keno — Daily AI Tips for Developers",
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Keno — AI Tips for Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keno — Daily AI Tips for Developers",
    description: DESCRIPTION,
    images: ["/opengraph-image"],
    creator: "@srteerra",
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
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Keno",
    url: APP_URL,
    description: DESCRIPTION,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    inLanguage: "en",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: {
      "@type": "Person",
      name: "Terra",
      url: "https://github.com/srteerra",
    },
    keywords:
      "developer tips, Git, React, TypeScript, JavaScript, CSS, Docker, DevTools, AI, productivity",
  };

  return (
    <html lang="en" className={poppins.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}
