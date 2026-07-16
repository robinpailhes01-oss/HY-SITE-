import type { Metadata } from "next";

export const SITE_URL = "https://harmonie-yacht.fr";
export const SITE_NAME = "Harmonie Yacht";
export const DEFAULT_OG_IMAGE = "/images/hero-sillage-coucher-soleil.jpg";

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      title,
      description,
      images: [image],
    },
  };
}
