import type { Metadata } from "next";
import Link from "next/link";
import { getGuidesByGroup, guideArticles } from "@/data/guides";

export const metadata: Metadata = {
  title: "使用指南 - 百宝箱",
  description: "阅读百宝箱原创工具使用指南，了解在线工具、效率工具、文件处理、图片处理、开发辅助、站长检测和安全使用方法。",
};

export default function GuidesPage() {
  const groupedGuides = getGuidesByGroup();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header
        className="rounded-2xl border px-5 py-5 sm:px-6 sm:py-6"
        style={{
          background: "var(--hero-bg)",
          borderColor: "var(--card-border)",
          boxShadow: "0 12px 32px rgba(15,23,42,0.06)",
        }}
      >
        <span
          className="inline-flex h-8 items-center rounded-full border px-3 text-[12px] font-semibold"
          style={{
            color: "var(--accent)",
            background: "var(--nav-pill-bg)",
            borderColor: "var(--nav-pill-border)",
          }}
        >
          原创内容中心
        </span>
        <h1 className="mt-3 text-2xl font-black sm:text-[30px]" style={{ color: "var(--foreground)" }}>
          使用指南
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-7 sm:text-[15px]" style={{ color: "var(--muted)" }}>
          这里整理百宝箱围绕在线工具、效率办公、文件处理、图片处理、开发辅助、站长检测和安全使用写的原创说明。每篇文章都先解释使用场景和判断标准，再引导用户选择合适工具，避免只停留在外链跳转。
        </p>
        <div className="mt-4 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          已整理 {guideArticles.length} 篇工具指南
        </div>
      </header>

      {groupedGuides.map((section) => (
        <section key={section.group} className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[18px] font-bold sm:text-[20px]" style={{ color: "var(--foreground)" }}>
              {section.group}
            </h2>
            <span className="text-[12px]" style={{ color: "var(--muted)" }}>
              {section.articles.length} 篇
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {section.articles.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
              >
                <h3 className="text-[17px] font-bold leading-6" style={{ color: "var(--foreground)" }}>
                  {guide.title}
                </h3>
                <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
