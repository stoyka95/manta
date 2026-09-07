import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/bowling", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/restaurace-a-bar", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/oslavy-a-akce", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/cenik", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/rezervace", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/kontakt", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
