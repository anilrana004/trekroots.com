import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "TrekRoots | Explore New Heights",
  description:
    "Treks, yatras, packages and stays across Uttarakhand and Himachal Pradesh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/images/logo.png" />
      </head>
      <body className="bg-white text-[#1A1A1A] antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
