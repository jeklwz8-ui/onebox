import type { Resource } from "./resource-types";
import { baseResources } from "./base-resources";
import { baoboxsResources } from "./baoboxs-resources";

export type { Resource };

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

export const resources: Resource[] = mergeResources();

const baoboxsHotResources = baoboxsResources.filter((resource) => resource.category === "hot");

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
