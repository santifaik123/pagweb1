import type { MetadataRoute } from "next";

import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
    short_name: "Nuvik Digital",
    description:
      "Soluciones digitales para vender, operar y escalar: sitios web, software a medida, automatización e inteligencia artificial.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7f7f5",
    theme_color: "#181a1b",
    lang: "es-CL",
    icons: [
      {
        src: "/assets/logos/nuvik-symbol-white.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/assets/logos/nuvik-symbol.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}
