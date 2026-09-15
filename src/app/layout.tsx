import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { LOGO_URL } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: "TrekRoots | Explore New Heights",
  description:
    "Treks, yatras, packages and stays across Uttarakhand and Himachal Pradesh.",
  icons: {
    icon: LOGO_URL,
    apple: LOGO_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
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
      </head>
      <body className="bg-white text-[#1A1A1A] antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
