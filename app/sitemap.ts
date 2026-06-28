import type { MetadataRoute } from "next";
import { guideArticles } from "@/data/guides";
import { getPublicToolDetailResources } from "@/data/tool-details";

const BASE_URL = "https://baoboxs.top";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const trustPages = ["about", "privacy", "contact", "terms"];

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...trustPages.map((page) => ({
      url: `${BASE_URL}/${page}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...guideArticles.map((article) => ({
      url: `${BASE_URL}/guides/${article.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...getPublicToolDetailResources().map((resource) => ({
      url: `${BASE_URL}/tools/${resource.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
