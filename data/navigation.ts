import { ADSENSE_REVIEW_HIDDEN_CATEGORIES, ADSENSE_REVIEW_MODE } from "./adsense-review";

export interface NavGroup {
  key: string;
  label: string;
  icon: string;
  href: string;
  ids: string[];
}

const rawNavGroups: NavGroup[] = [
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

export const navGroups: NavGroup[] = rawNavGroups
  .map((group) => ({
    ...group,
    ids: ADSENSE_REVIEW_MODE ? group.ids.filter((id) => !ADSENSE_REVIEW_HIDDEN_CATEGORIES.has(id)) : group.ids,
  }))
  .filter((group) => group.ids.length > 0);

export function isNavGroupActive(pathname: string, group: NavGroup): boolean {
  return group.ids.some((id) => (id === "home" ? pathname === "/" : pathname === "/" + id));
}
