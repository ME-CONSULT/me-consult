import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://me-consult.org";

const pages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "yearly", priority: 0.8 },
  { path: "/advisory-services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/sectors", changeFrequency: "monthly", priority: 0.7 },
  { path: "/affiliated-platform", changeFrequency: "yearly", priority: 0.5 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.6 },
  { path: "/insights", changeFrequency: "weekly", priority: 0.7 },
  { path: "/team-onboarding", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
  { path: "/book", changeFrequency: "monthly", priority: 0.9 },
  { path: "/book/other-services", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/online-consultation-terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
