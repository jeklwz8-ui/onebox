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

  useEffect(() => {
    const id = window.setTimeout(() => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      setCollapsedState(getCollapsed() || !isDesktop);
      setSidebarWidth(getSidebarWidth());
      setMounted(true);
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  function toggleCollapsed() {
    setCollapsedState((cur) => {
      persistCollapsed(!cur);
      return !cur;
    });
  }

  function handleSidebarToggle() {
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
      <Navbar
        onSidebarToggle={handleSidebarToggle}
      />

      <div className="flex flex-1 min-h-0" style={{ background: "var(--bg-secondary)" }}>
        {/* Collapsible sidebar */}
        {mounted && (
          <div className="shrink-0">
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
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
          <div className="flex-1 px-5 sm:px-6 py-6 max-w-screen-2xl w-full mx-auto">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
