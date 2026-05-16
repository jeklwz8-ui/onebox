"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Moon, Sun, Star, X, Code2, Command, PanelLeftClose } from "lucide-react";
import { toggleTheme, getTheme } from "@/lib/theme";
import { categories } from "@/data/categories";
import { getFaviconUrl } from "@/lib/utils";
import { FAVORITES_CHANGED_EVENT, getFavoriteIds } from "@/lib/bookmarks";
import type { Resource } from "@/data/resource-types";

interface NavbarProps {
  onSidebarToggle?: () => void;
}

export default function Navbar({ onSidebarToggle }: NavbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const [results, setResults] = useState<Resource[]>([]);

  const categoryMap = useMemo(() => new Map(categories.map((category) => [category.id, category])), []);
  const visibleResults = query.trim() ? results : [];

  useEffect(() => {
    function refreshCounts() {
      setFavCount(getFavoriteIds().length);
    }

    const id = window.setTimeout(() => {
      setIsDark(getTheme() === "dark");
      refreshCounts();
      setMounted(true);
    }, 0);

    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }

    function onStorage(e: StorageEvent) {
      if (e.key === "dev-nav-favorites") {
        refreshCounts();
      }
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener(FAVORITES_CHANGED_EVENT, refreshCounts);
    window.addEventListener("storage", onStorage);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(FAVORITES_CHANGED_EVENT, refreshCounts);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    let cancelled = false;

    async function runSearch() {
      const { searchResources } = await import("@/data/resources");
      if (!cancelled) setResults(searchResources(trimmed).slice(0, 12));
    }

    runSearch();

    return () => {
      cancelled = true;
    };
  }, [query]);

  function handleToggleTheme() {
    const next = toggleTheme();
    setIsDark(next === "dark");
  }

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "var(--navbar-bg)",
        backdropFilter: "var(--navbar-blur)",
        WebkitBackdropFilter: "var(--navbar-blur)",
        borderBottom: "1px solid var(--card-border)",
      }}
    >
      <div className="flex items-center gap-2.5 px-4 h-12 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onSidebarToggle}
            title="打开或收起侧边栏"
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-opacity hover:opacity-85"
            style={{ background: "var(--accent)" }}
          >
            <PanelLeftClose size={14} className="text-white" />
          </button>
          <Code2 size={16} className="hidden sm:block" style={{ color: "var(--accent)" }} />
          <Link href="/" className="font-bold text-[15px] hidden sm:block" style={{ color: "var(--foreground)" }}>
            开发者导航
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-xl">
            <div
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-colors duration-150"
              style={{
                background: "var(--search-bg)",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--card-border)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "transparent";
              }}
            >
              <Search size={14} style={{ color: "var(--muted)" }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="搜索工具、框架、资源、分类..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowResults(e.target.value.trim().length > 0);
                }}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                onFocus={() => query && setShowResults(true)}
                className="flex-1 bg-transparent text-[13px] outline-none min-w-0"
                style={{ color: "var(--foreground)" }}
              />
              {query ? (
                <button onClick={() => setQuery("")} className="p-0.5" title="清空搜索">
                  <X size={13} style={{ color: "var(--muted)" }} />
                </button>
              ) : (
                <kbd
                  className="hidden sm:flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded"
                  style={{ background: "var(--card-border)", color: "var(--muted)" }}
                >
                  <Command size={10} />K
                </kbd>
              )}
            </div>

            {showResults && visibleResults.length > 0 && (
              <div
                className="absolute top-full mt-1 w-full rounded-lg shadow-xl border overflow-hidden z-50"
                style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
              >
                {visibleResults.map((resource, index) => {
                  const hasUrl = resource.url.trim().length > 0;
                  const content = (
                    <>
                      <img
                        src={getFaviconUrl(resource.url, resource.icon)}
                        alt=""
                        className="w-5 h-5 rounded object-contain"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>
                          {resource.name}
                        </div>
                        <div className="text-xs truncate" style={{ color: "var(--muted)" }}>
                          {resource.description}
                        </div>
                      </div>
                      <span
                        className="ml-auto text-xs px-2 py-0.5 rounded-full shrink-0"
                        style={{ background: "var(--tag-bg)", color: "var(--tag-text)" }}
                      >
                        {hasUrl ? categoryMap.get(resource.category)?.label ?? resource.subcategory : "待补链接"}
                      </span>
                    </>
                  );

                  if (!hasUrl) {
                    return (
                      <div
                        key={`${resource.id}-${resource.category}-${index}`}
                        className="flex items-center gap-3 px-4 py-3 border-b last:border-b-0"
                        style={{ borderColor: "var(--card-border)" }}
                      >
                        {content}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={`${resource.id}-${resource.category}-${index}`}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 hover:opacity-80 transition-opacity border-b last:border-b-0"
                      style={{ borderColor: "var(--card-border)" }}
                    >
                      {content}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <IconLink href="/favorites" title="收藏" count={mounted ? favCount : 0}>
            <Star size={16} />
          </IconLink>
          <button
            onClick={handleToggleTheme}
            className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ color: "var(--muted)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--sidebar-hover)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
            }}
            title="切换主题"
          >
            <span
              className="inline-flex transition-transform duration-300"
              style={{ transform: mounted && isDark ? "rotate(360deg)" : "rotate(0deg)" }}
            >
              {mounted ? (isDark ? <Sun size={16} /> : <Moon size={16} />) : <Moon size={16} />}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function IconLink({
  href, title, count, children,
}: {
  href: string; title: string; count: number; children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      title={title}
      className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
      style={{ color: "var(--muted)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "var(--sidebar-hover)";
        (e.currentTarget as HTMLAnchorElement).style.color = "var(--foreground)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
        (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
      }}
    >
      {children}
      {count > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
