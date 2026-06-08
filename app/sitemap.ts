import type { MetadataRoute } from "next";
import { ADSENSE_REVIEW_HIDDEN_CATEGORIES, ADSENSE_REVIEW_MODE } from "@/data/adsense-review";
import { categories } from "@/data/categories";
import { guideArticles } from "@/data/guides";

const BASE_URL = "https://baoboxs.top";
const RESERVED_CATEGORY_ROUTES = new Set(["moyu"]);

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
      .filter((category) => {
        if (category.id === "home") return false;
        if (RESERVED_CATEGORY_ROUTES.has(category.id)) return false;
        return !ADSENSE_REVIEW_MODE || !ADSENSE_REVIEW_HIDDEN_CATEGORIES.has(category.id);
      })
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
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...guideArticles.map((article) => ({
      url: `${BASE_URL}/guides/${article.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
  ];
}
