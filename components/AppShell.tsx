"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import {
  getCollapsed,
  getSidebarWidth,
  setCollapsed as persistCollapsed,
  setSidebarWidth as persistSidebarWidth,
} from "@/lib/sidebar-state";

const MIN_SIDEBAR_WIDTH = 180;
const MAX_SIDEBAR_WIDTH = 320;

export default function AppShell({
  children,
  categoryCounts,
}: {
  children: React.ReactNode;
  categoryCounts: Record<string, number>;
}) {
  const [collapsed, setCollapsedState] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    function syncViewport() {
      setIsMobile(media.matches);
      if (!media.matches) setMobileMenuOpen(false);
    }

    syncViewport();
    media.addEventListener("change", syncViewport);

    const id = window.setTimeout(() => {
      const usesDesktopSidebar = window.matchMedia("(min-width: 768px)").matches;
      setCollapsedState(usesDesktopSidebar ? getCollapsed() : false);
      setSidebarWidth(getSidebarWidth());
      setMounted(true);
    }, 0);

    return () => {
      window.clearTimeout(id);
      media.removeEventListener("change", syncViewport);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  function toggleCollapsed() {
    setCollapsedState((cur) => {
      persistCollapsed(!cur);
      return !cur;
    });
  }

  function handleSidebarToggle() {
    if (isMobile) {
      setMobileMenuOpen((cur) => !cur);
      return;
    }
    toggleCollapsed();
  }

  function handleResizeStart(e: React.PointerEvent<HTMLButtonElement>) {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = sidebarWidth;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    function handleMove(event: PointerEvent) {
      const next = Math.min(
        MAX_SIDEBAR_WIDTH,
        Math.max(MIN_SIDEBAR_WIDTH, startWidth + event.clientX - startX)
      );
      setSidebarWidth(next);
    }

    function handleUp() {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      setSidebarWidth((current) => {
        persistSidebarWidth(current);
        return current;
      });
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }

  return (
    <div className="flex flex-col h-full">
      <Navbar onSidebarToggle={handleSidebarToggle} />

      <div className="flex flex-1 min-h-0" style={{ background: "var(--bg-secondary)" }}>
        {/* Collapsible sidebar */}
        <div className="hidden shrink-0 md:block">
          <div className="sticky top-12 h-[calc(100vh-3rem)] overflow-y-auto relative">
            <Sidebar
              collapsed={collapsed}
              onToggleCollapse={toggleCollapsed}
              width={sidebarWidth}
              categoryCounts={categoryCounts}
            />
            {!collapsed && (
              <button
                type="button"
                aria-label="调整侧边栏宽度"
                title="拖拽调整侧边栏宽度"
                onPointerDown={handleResizeStart}
                className="absolute top-0 right-0 h-full w-1 cursor-col-resize transition-colors hover:bg-indigo-400/50"
              />
            )}
          </div>
        </div>

        {mounted && mobileMenuOpen && (
          <div className="fixed inset-0 z-[70] md:hidden">
            <button
              type="button"
              aria-label="关闭导航"
              className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-[min(86vw,320px)] shadow-2xl">
              <Sidebar
                collapsed={false}
                width="100%"
                categoryCounts={categoryCounts}
                onClose={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
          <div className="flex-1 px-3 py-4 sm:px-6 sm:py-6 max-w-screen-2xl w-full mx-auto">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
