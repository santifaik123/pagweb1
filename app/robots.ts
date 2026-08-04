import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

const allowedBots = [
  "*",
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
];

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowedBots.map((userAgent) => ({
      userAgent,
      allow: "/",
      disallow: ["/admin", "/login", "/i/"],
    })),
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
