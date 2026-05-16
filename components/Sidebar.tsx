"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft, ChevronRight, ChevronDown, Search, X, Star,
} from "lucide-react";
import { categories } from "@/data/categories";
import { navGroups } from "@/data/navigation";
import {
  getFoldedGroups, setFoldedGroups as persistFolded,
} from "@/lib/sidebar-state";

interface SidebarProps {
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  width?: number;
  categoryCounts: Record<string, number>;
}

// Special markers for nav items
const ITEM_BADGES: Record<string, "hot" | "new"> = {
  hot: "hot",
  "ai-launch": "new",
};

function NavItem({
  icon, label, href, active, collapsed, count, badge, onClick, prominent = false,
}: {
  icon?: string; label: string; href: string;
  active: boolean; collapsed: boolean;
  count?: number; badge?: "hot" | "new"; onClick?: () => void; prominent?: boolean;
}) {
  return (
    <div className="relative group/navitem">
      <Link
        href={href}
        onClick={onClick}
        className={`
          ${active ? "sidebar-link-active" : "sidebar-link"}
          relative flex w-full items-center gap-2 rounded-md border border-transparent px-2.5
          transition-[background-color,border-color,box-shadow,color,transform] duration-150 my-[1px]
          ${prominent ? "h-9 text-[15px] font-semibold" : "h-8 text-[13.8px] font-semibold"}
          ${active && !prominent ? "font-bold" : ""}
        `}
        style={
          active
            ? {
                background: "var(--sidebar-active)",
                borderColor: "var(--sidebar-active-border)",
                boxShadow: "var(--sidebar-active-shadow)",
                color: "var(--sidebar-active-text)",
              }
            : { color: "var(--foreground)" }
        }
      >
        {active && (
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full"
            style={{ background: "var(--sidebar-indicator)" }}
          />
        )}
        {icon && (
          <span className={`relative w-5 shrink-0 text-center leading-none ${prominent ? "text-[17px]" : "text-[16px]"}`}>
            {icon}
            {badge === "hot" && (
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-red-500" />
            )}
          </span>
        )}
        {!icon && !collapsed && <span className="w-5 shrink-0" aria-hidden="true" />}
        {!collapsed && (
          <>
            <span className="truncate flex-1">{label}</span>
            {badge === "new" && (
              <span
                className="text-[9px] font-bold px-1 rounded leading-[14px] tracking-wide"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                NEW
              </span>
            )}
          </>
        )}
      </Link>

      {collapsed && (
        <span
          className="
            pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-[200]
            px-2.5 py-1 rounded-md text-[12px] font-medium whitespace-nowrap
            opacity-0 group-hover/navitem:opacity-100
            transition-opacity duration-150
          "
          style={{
            background: "var(--tooltip-bg, #1e293b)",
            color: "var(--tooltip-text, #f1f5f9)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            border: "1px solid var(--sidebar-border)",
          }}
        >
          {label}{typeof count === "number" && count > 0 ? ` · ${count} 项` : ""}
        </span>
      )}
    </div>
  );
}

function ShortcutItem({
  href, icon, label, active, collapsed, onClick,
}: {
  href: string; icon: React.ReactNode; label: string;
  active: boolean; collapsed: boolean; onClick?: () => void;
}) {
  return (
    <div className="relative group/navitem">
      <Link
        href={href}
        onClick={onClick}
        className={`
          ${active ? "sidebar-link-active" : "sidebar-link"}
          relative flex h-9 w-full items-center gap-2 rounded-md border border-transparent px-2.5 text-[15px]
          transition-[background-color,border-color,box-shadow,color,transform] duration-150 my-[1px]
          ${active ? "font-bold" : "font-semibold"}
        `}
        style={
          active
            ? { background: "var(--sidebar-active)", color: "var(--sidebar-active-text)" }
            : { color: "var(--foreground)" }
        }
      >
        <span className="shrink-0 flex items-center justify-center w-5">
          {icon}
        </span>
        {!collapsed && <span className="truncate flex-1">{label}</span>}
      </Link>
      {collapsed && (
        <span
          className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-[200] px-2.5 py-1 rounded-md text-[12px] font-medium whitespace-nowrap opacity-0 group-hover/navitem:opacity-100 transition-opacity duration-150"
          style={{ background: "var(--tooltip-bg, #1e293b)", color: "var(--tooltip-text, #f1f5f9)", boxShadow: "0 4px 16px rgba(0,0,0,0.18)", border: "1px solid var(--sidebar-border)" }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

export default function Sidebar({
  onClose,
  collapsed = false,
  onToggleCollapse,
  width = 220,
  categoryCounts,
}: SidebarProps) {
  const pathname = usePathname();
  const catMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c])),
    []
  );

  // UI state — hydrated from localStorage on mount
  const [hydrated, setHydrated] = useState(false);
  const [folded, setFoldedState] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const id = window.setTimeout(() => {
      setFoldedState(getFoldedGroups());
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  function toggleGroup(key: string) {
    setFoldedState((cur) => {
      const next = cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key];
      persistFolded(next);
      return next;
    });
  }


  function isActive(id: string) {
    if (id === "home") return pathname === "/";
    return pathname === `/${id}`;
  }

  const q = query.trim().toLowerCase();
  const filtering = q.length > 0 && !collapsed;

  return (
    <aside
      className="sidebar-scope h-full flex flex-col overflow-hidden"
      style={{
        width: collapsed ? "52px" : `${width}px`,
        transition: "width 0.2s ease",
        background: "var(--sidebar-bg)",
        borderRight: "1px solid var(--sidebar-border)",
      }}
    >
      {/* ── Mini search (only when expanded) ── */}
      {!collapsed && (
        <div className="shrink-0 px-2.5 pt-2.5 pb-1.5">
          <div
            className="flex items-center gap-1.5 px-2 h-8 rounded-md"
            style={{ background: "var(--search-bg)" }}
          >
            <Search size={12} style={{ color: "var(--muted)" }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="过滤导航..."
              className="flex-1 bg-transparent text-[13px] outline-none min-w-0"
              style={{ color: "var(--foreground)" }}
            />
            {query && (
              <button onClick={() => setQuery("")} className="p-0.5">
                <X size={11} style={{ color: "var(--muted)" }} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-2 px-2.5 sidebar-nav-scroll">
        {navGroups.map((group, gi) => {
          if (group.key === "home") {
            const home = catMap.home;
            if (!home || filtering) return null;

            return (
              <div key={group.key}>
                <NavItem
                  href="/"
                  icon={home.icon}
                  label={home.label}
                  active={pathname === "/"}
                  collapsed={collapsed}
                  prominent
                  onClick={onClose}
                />
              </div>
            );
          }

          const items = group.ids
            .map((id) => catMap[id])
            .filter(Boolean)
            .filter((cat) => !filtering || cat.label.toLowerCase().includes(q));
          if (!items.length) return null;

          const isFolded = hydrated && folded.includes(group.key) && !filtering;

          return (
            <div key={group.key} className={gi > 0 ? "mt-3" : ""}>
              {/* Section label */}
              {!collapsed ? (
                <button
                  onClick={() => toggleGroup(group.key)}
                  disabled={filtering}
                  className="flex h-9 w-full items-center gap-2 rounded-md px-2.5 text-[15px] font-semibold transition-opacity hover:opacity-100 disabled:opacity-100"
                  style={{ color: "var(--foreground)" }}
                >
                  <span className="w-5 shrink-0 text-center text-[17px] leading-none">{group.icon}</span>
                  <span className="flex-1 text-left">{group.label}</span>
                  {!filtering && (
                    <ChevronDown
                      size={11}
                      strokeWidth={2.5}
                      className="transition-transform duration-200"
                      style={{ transform: isFolded ? "rotate(-90deg)" : "rotate(0deg)" }}
                    />
                  )}
                </button>
              ) : (
                <div className="relative group/navitem">
                  <Link
                    href={group.href}
                    onClick={onClose}
                    className="my-[1px] flex h-9 w-full items-center gap-2 rounded-md px-2.5"
                    style={{ color: "var(--foreground)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--sidebar-hover)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                  >
                    <span className="w-5 shrink-0 text-center text-[17px] leading-none">{group.icon}</span>
                  </Link>
                  <span
                    className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-[200] px-2.5 py-1 rounded-md text-[12px] font-medium whitespace-nowrap opacity-0 group-hover/navitem:opacity-100 transition-opacity duration-150"
                    style={{ background: "var(--tooltip-bg, #1e293b)", color: "var(--tooltip-text, #f1f5f9)", boxShadow: "0 4px 16px rgba(0,0,0,0.18)", border: "1px solid var(--sidebar-border)" }}
                  >
                    {group.label}
                  </span>
                </div>
              )}

              {/* Items (hidden when folded, unless searching) */}
              {!collapsed &&
                !isFolded &&
                items.map((cat) => (
                  <NavItem
                    key={cat.id}
                    href={cat.id === "home" ? "/" : `/${cat.id}`}
                    label={cat.label}
                    active={isActive(cat.id)}
                    collapsed={collapsed}
                    count={cat.id === "home" ? undefined : categoryCounts[cat.id]}
                    badge={ITEM_BADGES[cat.id]}
                    onClick={onClose}
                  />
                ))}
            </div>
          );
        })}

        {filtering &&
          navGroups.every((g) =>
            g.ids
              .map((id) => catMap[id])
              .filter(Boolean)
              .every((c) => !c.label.toLowerCase().includes(q))
          ) && (
            <div className="text-center text-[12px] py-6" style={{ color: "var(--muted)" }}>
              无匹配项
            </div>
          )}

        {/* ── Favorites shortcut ── */}
        <div
          className="mt-3 pt-2"
          style={{ borderTop: "1px solid var(--sidebar-border)" }}
        >
          <ShortcutItem
            href="/favorites"
            icon={<Star size={15} />}
            label="收藏"
            active={pathname === "/favorites"}
            collapsed={collapsed}
            onClick={onClose}
          />
        </div>
      </nav>

      {/* ── Bottom controls ── */}
      {onToggleCollapse && (
        <div
          className="shrink-0 px-2.5 py-1.5"
          style={{ borderTop: "1px solid var(--sidebar-border)" }}
        >
          <button
            onClick={onToggleCollapse}
            title={collapsed ? "展开导航" : "收起导航"}
            className="flex items-center gap-2 px-2.5 h-8 w-full rounded-md text-[12px] font-medium transition-colors"
            style={{ color: "var(--muted)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--sidebar-hover)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
            }}
          >
            <span className="w-5 flex items-center justify-center shrink-0">
              {collapsed
                ? <ChevronRight size={15} strokeWidth={2.3} />
                : <ChevronLeft size={15} strokeWidth={2.3} />
              }
            </span>
            {!collapsed && <span>收起</span>}
          </button>
        </div>
      )}
    </aside>
  );
}
