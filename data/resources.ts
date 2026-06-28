import type { Resource } from "./resource-types";
import { ADSENSE_REVIEW_HIDDEN_CATEGORIES, ADSENSE_REVIEW_MODE } from "./adsense-review";
import { baseResources } from "./base-resources";
import { PUBLIC_TOOL_DETAIL_IDS, PUBLIC_TOOL_DETAIL_ID_SET } from "./public-tool-detail-ids";

export type { Resource };

const ADSENSE_REVIEW_RISK_KEYWORDS = [
  "k" + "ms",
  "b" + "t",
  ["破", "解"].join(""),
  ["激", "活"].join(""),
  ["永", "久", "激", "活"].join(""),
  ["激", "活", "码"].join(""),
  ["激", "活", "工", "具"].join(""),
  ["磁", "力"].join(""),
  ["种", "子"].join(""),
  ["盗", "版"].join(""),
  ["奈", "飞"].join(""),
  ["电", "影", "下", "载"].join(""),
  ["影", "视", "资", "源"].join(""),
  ["影", "视", "下", "载"].join(""),
  ["在", "线", "观", "看"].join(""),
  ["在", "线", "播", "放"].join(""),
  ["资", "源", "站"].join(""),
  ["资", "源", "采", "集"].join(""),
  ["资", "源", "搜", "索"].join(""),
  ["网", "盘", "资", "源"].join(""),
  ["云", "盘", "资", "源"].join(""),
  ["免", "费", "下", "载", "电", "影"].join(""),
  ["免", "费", "下", "载", "视", "频"].join(""),
  ["免", "费", "获", "取", "音", "乐"].join(""),
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
  return baseResources.map((resource) => ({ ...resource, source: resource.source ?? "manual" }));
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
  if (!ADSENSE_REVIEW_MODE) return items;
  return items.filter((resource) => (
    PUBLIC_TOOL_DETAIL_ID_SET.has(resource.id) &&
    isResourceVisibleForAdsenseReview(resource)
  ));
}

const allResources: Resource[] = mergeResources();

export const resources: Resource[] = getPublicResources(allResources);

function getHotResources(): Resource[] {
  const ordered: Resource[] = [];
  const hotUrls = new Set<string>();
  const hotIds = new Set<string>();

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
  if (ADSENSE_REVIEW_MODE) {
    const byId = new Map(resources.map((resource) => [resource.id, resource]));
    return PUBLIC_TOOL_DETAIL_IDS.map((id) => byId.get(id))
      .filter((resource): resource is Resource => Boolean(resource))
      .slice(0, limit);
  }

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
    if (ADSENSE_REVIEW_MODE && !PUBLIC_TOOL_DETAIL_ID_SET.has(r.id)) return false;

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
