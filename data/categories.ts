export interface Category {
  id: string;
  label: string;
  icon?: string;
  description: string;
}

export const categories: Category[] = [
  { id: "home", label: "首页", icon: "🏠", description: "站长工具与效率工具指南" },
  { id: "guides", label: "使用指南", icon: "📘", description: "原创工具指南、上线检查与安全使用说明" },
  { id: "tools", label: "在线工具", icon: "🧰", description: "站内轻量工具与精选工具说明" },
];
