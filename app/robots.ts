import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowedBots.map((userAgent) => ({
      userAgent,
      allow: "/",
    })),
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
