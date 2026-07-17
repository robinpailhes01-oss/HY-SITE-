import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteCursor } from "@/components/cursor/site-cursor";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const SITE_TITLE = "Harmonie Yacht — Location de yacht à Carnon, Montpellier";
const SITE_DESCRIPTION =
  "Harmonie Yacht, créateurs de moments authentiques : sorties en mer à Carnon pour EVJF, anniversaires et entreprises, et nuits insolites à bord au coucher du soleil.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Harmonie Yacht",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "location yacht Carnon",
    "location bateau Montpellier",
    "sortie en mer EVJF",
    "nuit insolite bateau",
    "yacht Carnon Plage",
  ],
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sillage doré au coucher du soleil vu depuis le pont d'un yacht Harmonie Yacht",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
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
    <html lang="fr">
      <body
        className={`${fraunces.variable} ${manrope.variable} font-sans antialiased bg-sable text-marine`}
      >
        <MotionConfig reducedMotion="user">
          <SiteCursor />
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionConfig>
      </body>
    </html>
  );
}
