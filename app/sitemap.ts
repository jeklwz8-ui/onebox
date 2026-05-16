import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";

const BASE_URL = "https://baoboxs.top";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...categories
      .filter((category) => category.id !== "home")
      .map((category) => ({
        url: `${BASE_URL}/${category.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: category.id === "recommend" || category.id === "hot" || category.id === "ai" ? 0.9 : 0.7,
      })),
    {
      url: `${BASE_URL}/favorites`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/moyu`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
