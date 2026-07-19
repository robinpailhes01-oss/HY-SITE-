import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const PAGES = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/nuits-insolites", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/sorties", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/la-flotte", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/tarifs", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/galerie", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/reserver", priority: 0.9, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
