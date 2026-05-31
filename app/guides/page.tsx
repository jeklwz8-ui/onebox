import type { Metadata } from "next";
import Link from "next/link";

const guides = [
  {
    href: "/guides/how-to-use-online-tools",
    title: "如何更高效地使用在线工具",
    description: "从格式转换、文本处理、调试校验和隐私安全四个角度，整理在线工具的实用使用方法。",
  },
  {
    href: "/guides/developer-resource-navigation",
    title: "开发者如何搭建自己的资源导航体系",
    description: "介绍如何按工作流整理 AI、开发、设计、云服务和学习资源，减少重复搜索。",
  },
  {
    href: "/guides/video-audio-image-download-tools",
    title: "视频、音频和图片下载工具怎么选",
    description: "说明在线媒体下载工具的适用场景、使用边界、格式选择和安全注意事项。",
  },
];

export const metadata: Metadata = {
  title: "使用指南 - 百宝箱",
  description: "阅读百宝箱原创使用指南，了解在线工具、开发者资源导航和媒体下载工具的实用方法。",
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-5">
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
          原创内容
        </span>
        <h1 className="mt-3 text-2xl font-black sm:text-[30px]" style={{ color: "var(--foreground)" }}>
          使用指南
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-7 sm:text-[15px]" style={{ color: "var(--muted)" }}>
          这里整理百宝箱围绕在线工具、开发效率和资源选择写的原创说明，帮助用户理解工具适用场景，而不是只停留在外链跳转。
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
          >
            <h2 className="text-[17px] font-bold leading-6" style={{ color: "var(--foreground)" }}>
              {guide.title}
            </h2>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
              {guide.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
