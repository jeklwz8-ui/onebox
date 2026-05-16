"use client";

import { useEffect, useState } from "react";
import { Star, Trash2 } from "lucide-react";
import ResourceCard from "@/components/ResourceCard";
import {
  FAVORITES_CHANGED_EVENT,
  getFavoriteIds,
  toggleFavorite,
  filterResourcesByIds,
} from "@/lib/bookmarks";
import type { Resource } from "@/data/resource-types";

export default function FavoritesClient({ resources }: { resources: Resource[] }) {
  const [hydrated, setHydrated] = useState(false);
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    function refreshFavorites() {
      setIds(getFavoriteIds());
    }

    const id = window.setTimeout(() => {
      refreshFavorites();
      setHydrated(true);
    }, 0);
    window.addEventListener(FAVORITES_CHANGED_EVENT, refreshFavorites);
    window.addEventListener("storage", refreshFavorites);

    return () => {
      window.clearTimeout(id);
      window.removeEventListener(FAVORITES_CHANGED_EVENT, refreshFavorites);
      window.removeEventListener("storage", refreshFavorites);
    };
  }, []);

  function handleRemoveAll() {
    ids.forEach((id) => toggleFavorite(id));
    setIds([]);
  }

  const favorited = filterResourcesByIds(resources, ids);

  return (
    <div>
      {favorited.length > 0 && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleRemoveAll}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)", background: "var(--search-bg)" }}
          >
            <Trash2 size={14} />
            清空收藏
          </button>
        </div>
      )}

      {!hydrated ? (
        <div className="py-20 text-center text-sm" style={{ color: "var(--muted)" }}>
          正在加载收藏...
        </div>
      ) : favorited.length === 0 ? (
        <div
          className="text-center py-20"
          style={{ color: "var(--muted)" }}
        >
          <Star size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">还没有收藏，浏览资源时点击星标图标即可收藏</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] md:gap-4">
          {favorited.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onFavoriteChange={(id, next) => {
                if (!next) setIds((current) => current.filter((item) => item !== id));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
