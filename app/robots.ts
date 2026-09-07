import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // Crawl je schválně POVOLENÝ, přestože je web `noindex`. Kdyby tu
      // stálo `disallow: "/"`, robot stránku vůbec nestáhne, `noindex`
      // v hlavičce nikdy nepřečte — a URL se pak může v Googlu objevit
      // bez obsahu. Zákaz indexace patří do meta robots, ne sem.
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
