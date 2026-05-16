"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { Star, ExternalLink, Link2Off } from "lucide-react";
import type { Resource } from "@/data/resource-types";
import { getFaviconUrl } from "@/lib/utils";
import {
  FAVORITES_CHANGED_EVENT,
  toggleFavorite,
  isFavorite,
} from "@/lib/bookmarks";

interface ResourceCardProps {
  resource: Resource;
  onFavoriteChange?: (id: string, favorited: boolean) => void;
}

const CHARGE_LABELS: Record<number, string> = {
  1: "免费",
  2: "收费",
  3: "部分免费",
};

export default function ResourceCard({
  resource,
  onFavoriteChange,
}: ResourceCardProps) {
  const [favorited, setFavorited] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    function syncState() {
      setFavorited(isFavorite(resource.id));
    }

    const id = window.setTimeout(syncState, 0);
    window.addEventListener(FAVORITES_CHANGED_EVENT, syncState);

    return () => {
      window.clearTimeout(id);
      window.removeEventListener(FAVORITES_CHANGED_EVENT, syncState);
    };
  }, [resource.id]);

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const next = toggleFavorite(resource.id);
    setFavorited(next);
    onFavoriteChange?.(resource.id, next);
  }

  function openResource() {
    if (!hasUrl) return;
    window.open(resource.url, "_blank", "noopener,noreferrer");
  }

  function handleCardKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (!hasUrl || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    openResource();
  }

  const hasUrl = resource.url.trim().length > 0;
  const faviconUrl = getFaviconUrl(resource.url, resource.icon);
  const chargeLabel = typeof resource.charge === "number" ? CHARGE_LABELS[resource.charge] : undefined;

  return (
    <article
      role={hasUrl ? "link" : undefined}
      tabIndex={hasUrl ? 0 : undefined}
      onClick={openResource}
      onKeyDown={handleCardKeyDown}
      className={`group resource-card relative flex min-h-[112px] flex-col rounded-xl border p-3.5 transition-all duration-200 hover:-translate-y-0.5 ${
        hasUrl ? "cursor-pointer" : ""
      }`}
      style={{
        background: "var(--card)",
        borderColor: "var(--card-border)",
      }}
    >
      <div className="flex items-start gap-2.5">
        <div className="shrink-0">
          <div
            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border transition-transform duration-200 group-hover:scale-105"
            style={{ background: "var(--search-bg)", borderColor: "var(--card-border)" }}
          >
            {!imgError && faviconUrl ? (
              <img
                src={faviconUrl}
                alt=""
                className="h-5 w-5 object-contain"
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-base font-bold" style={{ color: "var(--accent)" }}>
                {resource.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-center gap-1 leading-tight">
            <span
              className="truncate text-[14px] font-bold"
              style={{ color: "var(--foreground)" }}
            >
              {resource.name}
            </span>
            {hasUrl ? (
              <ExternalLink
                size={12}
                className="mt-px shrink-0 opacity-0 transition-opacity group-hover:opacity-45"
                style={{ color: "var(--muted)" }}
              />
            ) : (
              <Link2Off size={12} className="mt-px shrink-0" style={{ color: "var(--muted)" }} />
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <Badge>{resource.subcategory}</Badge>
            {!hasUrl && <Badge>待补链接</Badge>}
            {resource.lang && <Badge>{resource.lang.toUpperCase()}</Badge>}
            {chargeLabel && <Badge>{chargeLabel}</Badge>}
          </div>
        </div>

        <div className="flex shrink-0 gap-0.5">
          <CardActionBtn
            active={favorited}
            activeColor="#f59e0b"
            title={favorited ? "取消收藏" : "加入收藏"}
            onClick={handleFavorite}
          >
            <Star size={13} fill={favorited ? "currentColor" : "none"} />
          </CardActionBtn>
        </div>
      </div>

      <div className="mt-2.5 block flex-1">
        <p
          className="line-clamp-2 text-[13px] leading-[1.65]"
          style={{ color: "var(--muted)" }}
        >
          {resource.description}
        </p>
      </div>
    </article>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex max-w-full items-center rounded px-1.5 py-0.5 text-[10px] font-medium leading-none"
      style={{ background: "var(--tag-bg)", color: "var(--tag-text)" }}
    >
      {children}
    </span>
  );
}

function CardActionBtn({
  active, activeColor, title, onClick, children,
}: {
  active: boolean;
  activeColor: string;
  title: string;
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex h-7 w-7 items-center justify-center rounded-md transition-colors"
      style={{ color: active ? activeColor : "var(--muted)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "var(--search-bg)";
        if (!active) (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        if (!active) (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
      }}
    >
      {children}
    </button>
  );
}
