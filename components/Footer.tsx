import Link from "next/link";
import { Code2 } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "内容",
    items: [
      { label: "首页", href: "/" },
      { label: "使用指南", href: "/guides" },
      { label: "在线工具", href: "/tools" },
    ],
  },
  {
    title: "站点",
    items: [
      { label: "关于我们", href: "/about" },
      { label: "隐私政策", href: "/privacy" },
      { label: "服务条款", href: "/terms" },
      { label: "联系方式", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{
        borderTop: "1px solid var(--card-border)",
        background: "var(--card)",
      }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 py-5 sm:px-6 sm:py-8">
        <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_180px_180px] sm:gap-8">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ background: "var(--accent)" }}
              >
                <Code2 size={14} className="text-white" />
              </div>
              <span className="text-[14px] font-bold" style={{ color: "var(--foreground)" }}>
                百宝箱
              </span>
            </div>
            <p className="max-w-xl text-[11px] leading-relaxed sm:text-[12px]" style={{ color: "var(--muted)" }}>
              百宝箱是面向站长、开发者和效率用户的工具指南站，提供原创使用说明、上线检查清单、精选工具详情和安全使用建议。
            </p>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h3
                className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] sm:mb-3"
                style={{ color: "var(--muted)" }}
              >
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[12px] transition-opacity hover:opacity-70"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-5 flex flex-col gap-1.5 pt-4 text-[11px] sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:pt-5"
          style={{ borderTop: "1px solid var(--card-border)", color: "var(--muted)" }}
        >
          <span>用心构建</span>
          <span>声明：外部工具的内容、价格、隐私规则和可用性以对应网站官方说明为准。</span>
        </div>
      </div>
    </footer>
  );
}
