import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://adinprasetya.vercel.app",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
