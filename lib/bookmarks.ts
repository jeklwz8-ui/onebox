"use client";

import type { Resource } from "@/data/resource-types";

const FAVORITES_KEY = "dev-nav-favorites";
export const FAVORITES_CHANGED_EVENT = "dev-nav-favorites-changed";

function getStorage(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function setStorage(key: string, ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent(FAVORITES_CHANGED_EVENT));
}

// 收藏
export function getFavoriteIds(): string[] {
  return getStorage(FAVORITES_KEY);
}

export function toggleFavorite(id: string): boolean {
  const ids = getFavoriteIds();
  const idx = ids.indexOf(id);
  if (idx === -1) {
    ids.push(id);
    setStorage(FAVORITES_KEY, ids);
    return true;
  } else {
    ids.splice(idx, 1);
    setStorage(FAVORITES_KEY, ids);
    return false;
  }
}

export function isFavorite(id: string): boolean {
  return getFavoriteIds().includes(id);
}

export function filterResourcesByIds(
  resources: Resource[],
  ids: string[]
): Resource[] {
  return resources.filter((r) => ids.includes(r.id));
}
