import type { Resource } from "./resource-types";
import { ADSENSE_REVIEW_HIDDEN_CATEGORIES, ADSENSE_REVIEW_MODE } from "./adsense-review";
import { baseResources } from "./base-resources";
import { baoboxsResources } from "./baoboxs-resources";

export type { Resource };

const ADSENSE_REVIEW_RISK_KEYWORDS = [
  "kms",
  "bt",
  "破解",
  "激活",
  "永久激活",
  "激活码",
  "激活工具",
  "磁力",
  "种子",
  "盗版",
  "奈飞",
  "电影下载",
  "影视资源",
  "影视下载",
  "在线观看",
  "在线播放",
  "资源站",
  "资源采集",
  "资源搜索",
  "网盘资源",
  "云盘资源",
  "免费下载电影",
  "免费下载视频",
  "免费获取音乐",
];

function normalizeResourceUrl(url: string): string {
  try {
    const parsed = new URL(url.trim());
    parsed.hash = "";
    parsed.hostname = parsed.hostname.toLowerCase();
    parsed.pathname = parsed.pathname.replace(/\/$/, "") || "/";
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return url.trim().toLowerCase().replace(/\/$/, "");
  }
}

function mergeResources(): Resource[] {
  return [
    ...baseResources.map((resource) => ({ ...resource, source: resource.source ?? "manual" })),
    ...baoboxsResources,
  ];
}

function getResourceReviewText(resource: Resource): string {
  return [
    resource.name,
    resource.description,
    resource.category,
    resource.subcategory,
    resource.sourceCategory,
    resource.sourceGroup,
    ...(resource.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function isResourceVisibleForAdsenseReview(resource: Resource): boolean {
  if (!ADSENSE_REVIEW_MODE) return true;
  if (ADSENSE_REVIEW_HIDDEN_CATEGORIES.has(resource.category)) return false;

  const haystack = getResourceReviewText(resource);
  return !ADSENSE_REVIEW_RISK_KEYWORDS.some((keyword) => haystack.includes(keyword.toLowerCase()));
}

function getPublicResources(items: Resource[]): Resource[] {
  return ADSENSE_REVIEW_MODE ? items.filter(isResourceVisibleForAdsenseReview) : items;
}

const allResources: Resource[] = mergeResources();

export const resources: Resource[] = getPublicResources(allResources);

const baoboxsHotResources = getPublicResources(baoboxsResources).filter((resource) => resource.category === "hot");

function getHotResources(): Resource[] {
  const ordered: Resource[] = [...baoboxsHotResources];
  const hotUrls = new Set(baoboxsHotResources.map((resource) => normalizeResourceUrl(resource.url)));
  const hotIds = new Set(baoboxsHotResources.map((resource) => resource.id));

  for (const resource of resources) {
    if (resource.source === "baoboxs") continue;
    if (resource.category !== "hot") continue;
    if (hotIds.has(resource.id)) continue;
    if (resource.url.trim() && hotUrls.has(normalizeResourceUrl(resource.url))) continue;
    ordered.push(resource);
  }

  return ordered;
}

export function getResourcesByCategory(category: string): Resource[] {
  if (category === "home") return resources;
  if (category === "hot") return getHotResources();
  return resources.filter((r) => r.category === category);
}

export function getSubcategoriesByCategory(category: string): string[] {
  const items = getResourcesByCategory(category);
  return [...new Set(items.map((r) => r.subcategory))];
}

export function getAllSubcategories(): string[] {
  return [...new Set(resources.map((r) => r.subcategory))];
}

export function getResourceStats() {
  const categoryCount = new Set(resources.map((r) => r.category)).size;
  const subcategoryCount = new Set(resources.map((r) => r.subcategory)).size;
  const baoboxsCount = resources.filter((r) => r.source === "baoboxs").length;
  return { total: resources.length, categoryCount, subcategoryCount, baoboxsCount };
}

export function getCategoryCounts(): Record<string, number> {
  return resources.reduce<Record<string, number>>((counts, resource) => {
    counts[resource.category] = (counts[resource.category] ?? 0) + 1;
    return counts;
  }, {});
}

export function getFeaturedResources(limit = 24): Resource[] {
  const priority = new Set(["recommend", "hot", "ai", "devtools", "efficiency", "design"]);
  return [...resources]
    .sort((a, b) => {
      const ap = priority.has(a.category) ? 1 : 0;
      const bp = priority.has(b.category) ? 1 : 0;
      if (ap !== bp) return bp - ap;
      return Number(b.source === "baoboxs") - Number(a.source === "baoboxs");
    })
    .slice(0, limit);
}

export function searchResources(query: string): Resource[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return resources.filter((r) => {
    const haystack = [
      r.name,
      r.description,
      r.url,
      r.category,
      r.subcategory,
      r.sourceCategory,
      r.sourceGroup,
      r.lang,
      ...(r.tags ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}
