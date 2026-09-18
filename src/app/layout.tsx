import type { Metadata } from "next";
import {
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { JsonLd } from "@/components/JsonLd";
import {
  organizationSchema,
  siteNavigationSchema,
  websiteSchema,
} from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { LOGO_URL } from "@/lib/cloudinary";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
  preload: true,
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: `${SITE_NAME} - Himalayan Treks That Transform Lives`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "TrekRoots runs Himalayan treks, sacred yatras, curated packages and mountain stays from Dehradun since 2018 — Uttarakhand, Himachal and beyond.",
  keywords: [
    "TrekRoots",
    "Himalayan treks",
    "Uttarakhand treks",
    "Kedarkantha",
    "Char Dham Yatra",
    "Valley of Flowers",
    "Dehradun trek operator",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "travel",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Himalayan Treks That Transform Lives`,
    description:
      "Guided Himalayan treks, sacred yatras, packages and stays — TrekRoots, Dehradun since 2018.",
    images: [{ url: LOGO_URL, width: 512, height: 512, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} - Himalayan Treks That Transform Lives`,
    description:
      "Guided Himalayan treks, sacred yatras, packages and stays from Dehradun.",
    images: [LOGO_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://media.trekroots.com" />
        <link rel="dns-prefetch" href="https://media.trekroots.com" />
        <JsonLd id="schema-organization" data={organizationSchema()} />
        <JsonLd id="schema-website" data={websiteSchema()} />
        <JsonLd id="schema-sitenavigation" data={siteNavigationSchema()} />
      </head>
      <body
        className={`${jakarta.className} bg-white text-[#1A1A1A] antialiased`}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
