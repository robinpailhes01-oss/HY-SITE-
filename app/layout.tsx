import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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

export const metadata: Metadata = {
  title: {
    default: "Harmonie Yacht — Location de yacht à Carnon, Montpellier",
    template: "%s — Harmonie Yacht",
  },
  description:
    "Harmonie Yacht, créateurs de moments authentiques : sorties en mer à Carnon pour EVJF, anniversaires et entreprises, et nuits insolites à bord au coucher du soleil.",
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
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
