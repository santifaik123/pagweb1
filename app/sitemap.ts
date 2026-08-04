import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { nuvikServices } from "@/lib/nuvik-services";

export const dynamic = "force-static";

const lastModified = new Date("2026-08-04T00:00:00.000Z");

const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/servicios", priority: 0.9 },
  { path: "/contacto", priority: 0.85 },
  { path: "/nuvik-digital", priority: 0.85 },
  { path: "/portafolio", priority: 0.75 },
  { path: "/dar.io", priority: 0.7 },
  { path: "/nexus", priority: 0.7 },
  { path: "/automatizaciones", priority: 0.7 },
  { path: "/terminos", priority: 0.35 },
  { path: "/privacidad", priority: 0.35 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = nuvikServices.map((service) => ({
    url: absoluteUrl(`/servicios/${service.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: route.priority,
    })),
    ...serviceRoutes,
  ];
}
