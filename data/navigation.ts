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
    key: "content",
    label: "内容",
    icon: "📘",
    href: "/guides",
    ids: ["guides", "tools"],
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
