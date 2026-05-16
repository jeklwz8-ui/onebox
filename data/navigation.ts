export interface NavGroup {
  key: string;
  label: string;
  icon: string;
  href: string;
  ids: string[];
}

export const navGroups: NavGroup[] = [
  {
    key: "home",
    label: "首页",
    icon: "🏠",
    href: "/",
    ids: ["home"],
  },
  {
    key: "recommend",
    label: "推荐",
    icon: "⭐",
    href: "/recommend",
    ids: ["recommend", "hot"],
  },
  {
    key: "ai",
    label: "AI",
    icon: "✨",
    href: "/ai",
    ids: ["ai", "ai-launch"],
  },
  {
    key: "dev",
    label: "开发",
    icon: "💻",
    href: "/frontend",
    ids: ["frontend", "backend", "devtools", "editor", "plugins", "python", "java", "mobile", "database"],
  },
  {
    key: "eff",
    label: "效率",
    icon: "⚡",
    href: "/efficiency",
    ids: ["efficiency", "software", "storage", "cloud", "api", "security", "bigdata"],
  },
  {
    key: "learn",
    label: "学习",
    icon: "📖",
    href: "/algorithm",
    ids: ["algorithm", "community", "docs"],
  },
  {
    key: "other",
    label: "其他",
    icon: "📦",
    href: "/design",
    ids: ["design", "media", "jobs", "gov", "moyu", "more"],
  },
];

export function isNavGroupActive(pathname: string, group: NavGroup): boolean {
  return group.ids.some((id) => (id === "home" ? pathname === "/" : pathname === "/" + id));
}
