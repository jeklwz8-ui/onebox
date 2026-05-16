import Link from "next/link";
import { Code2 } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "导航",
    items: [
      { label: "首页", href: "/" },
      { label: "AI 工具", href: "/ai" },
      { label: "前端开发", href: "/frontend" },
      { label: "在线工具", href: "/tools" },
    ],
  },
  {
    title: "我的",
    items: [
      { label: "收藏", href: "/favorites" },
      { label: "摸鱼专区", href: "/moyu" },
    ],
  },
  {
    title: "友情链接",
    items: [
      { label: "GitHub", href: "https://github.com", external: true },
      { label: "MDN", href: "https://developer.mozilla.org", external: true },
      { label: "Vercel", href: "https://vercel.com", external: true },
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
      <div className="max-w-screen-2xl mx-auto px-4 py-5 sm:px-6 sm:py-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "var(--accent)" }}
              >
                <Code2 size={14} className="text-white" />
              </div>
              <span className="font-bold text-[14px]" style={{ color: "var(--foreground)" }}>
                百宝箱
              </span>
            </div>
            <p className="text-[11px] leading-relaxed sm:text-[12px]" style={{ color: "var(--muted)" }}>
              面向开发者和效率用户的一站式资源导航平台
            </p>
          </div>

          {/* Links */}
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
                    {"external" in item && item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] transition-opacity hover:opacity-70"
                        style={{ color: "var(--foreground)" }}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[12px] transition-opacity hover:opacity-70"
                        style={{ color: "var(--foreground)" }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="mt-5 flex flex-col gap-1.5 pt-4 text-[11px] sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:pt-5"
          style={{ borderTop: "1px solid var(--card-border)", color: "var(--muted)" }}
        >
          <span>用 ❤️ 构建</span>
          <span>声明：本站收录的第三方站点，版权均归目标站点所有</span>
        </div>
      </div>
    </footer>
  );
}
