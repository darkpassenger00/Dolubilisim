import type { MetadataRoute } from "next";
import { services } from "../lib/site-content.mjs";

const siteUrl = "https://dolubilisim.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...services.map((service) => ({
      url: `${siteUrl}/hizmetler/${service.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
