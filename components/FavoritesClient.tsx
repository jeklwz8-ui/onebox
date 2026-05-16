"use client";

import { useState } from "react";
import { Star, Trash2 } from "lucide-react";
import ResourceCard from "@/components/ResourceCard";
import { getFavoriteIds, toggleFavorite, filterResourcesByIds } from "@/lib/bookmarks";
import type { Resource } from "@/data/resource-types";

export default function FavoritesClient({ resources }: { resources: Resource[] }) {
  const [ids, setIds] = useState(() => getFavoriteIds());

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

      {favorited.length === 0 ? (
        <div
          className="text-center py-20"
          style={{ color: "var(--muted)" }}
        >
          <Star size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">还没有收藏，浏览资源时点击星标图标即可收藏</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
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
