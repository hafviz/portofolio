import type { MetadataRoute } from "next";
import { experiences } from "@/content/experiences";
import { projects } from "@/content/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, "");
  const staticRoutes = ["/", "/work", "/projects", "/evidence", "/community"];
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "monthly" as const,
  }));
  for (const p of projects) {
    entries.push({
      url: `${base}/projects/${p.id}`,
      changeFrequency: "monthly" as const,
    });
  }
  for (const e of experiences.filter((x) => x.featured)) {
    entries.push({
      url: `${base}/work/${e.id}`,
      changeFrequency: "monthly" as const,
    });
  }
  return entries;
}
