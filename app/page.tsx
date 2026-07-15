import Link from "next/link";
import CategorySection from "@/components/CategorySection";
import { guideArticles } from "@/data/guides";
import { getFeaturedResources } from "@/data/resources";

const heroParagraphs = [
  "百宝箱是面向站长、开发者和效率用户的工具指南站。站点当前审核期不追求收录数量，而是优先提供能帮助用户解决具体问题的原创说明：域名解析怎么检查，HTTPS 证书如何确认，ads.txt 为什么会被判定未找到，Nginx 和 PM2 出现 502 时应该从哪里排查，PDF、图片和文本在线处理时如何避免隐私风险。",
  "工具站最容易被误判为低价值内容的原因，是首页像外链目录、分类页很多但正文很薄、工具详情高度模板化。百宝箱现在把首页改成任务导向：先告诉用户适合解决什么问题，再给出具体检查步骤、命令示例、常见错误和安全边界，最后才提供少量精选工具入口。",
  "审核期公开工具会保持少而精。外部工具入口不再直接堆在首页，而是先进入站内详情页，说明用途、适用场景、推荐步骤、检查点、常见误区和替代方案。这样用户可以先判断工具是否适合当前任务，再决定是否访问外部网站。",
  "对于涉及账号、密钥、合同、客户资料、未公开代码、内部日志、财务信息和个人身份信息的任务，百宝箱建议优先使用本地软件或组织批准的系统。公开资料、测试样例、低敏内容和学习练习更适合在线工具处理。",
];

const topicLinks = [
  { title: "站长工具", href: "/guides/domain-dns-ssl-check-guide", text: "DNS、SSL、robots、sitemap、ads.txt 和 AdSense 技术验证。" },
  { title: "上线部署", href: "/guides/nginx-nextjs-proxy-guide", text: "Nginx、PM2、Next.js 构建、端口检查和 502 排查。" },
  { title: "内容质量", href: "/guides/low-value-content-adsense-fix-guide", text: "减少薄页面、模板页和纯外链，提升原创附加价值。" },
  { title: "安全使用", href: "/guides/safe-file-upload-guide", text: "判断在线工具是否适合处理当前文件和资料。" },
];

const faqItems = [
  {
    question: "为什么首页不再展示大量分类卡片？",
    answer: "审核期重点是证明站点有原创内容和清晰价值，而不是展示尽可能多的外链。大量卡片会让页面更像泛导航目录，增加低价值内容风险。",
  },
  {
    question: "为什么只保留 12 个工具详情页？",
    answer: "工具详情页如果数量很多但结构相似，容易被视为模板化页面。保留少量高质量页面并写出差异化说明，更符合审核期目标。",
  },
  {
    question: "收藏页和分类页是不是删除了？",
    answer: "功能没有作为核心内容展示。审核期它们不进入 sitemap，也不在主导航和页脚突出展示，以免薄页面影响审核判断。",
  },
  {
    question: "这些指南可以替代官方文档吗？",
    answer: "不能。百宝箱提供的是实践检查路径和使用建议，涉及第三方工具、云服务和广告平台规则时，仍应以对应官方说明为准。",
  },
];

export default function HomePage() {
  const featured = getFeaturedResources(12);
  const guidePreview = guideArticles.slice(0, 8);

  return (
    <div className="space-y-8">
      <section
        className="rounded-2xl border px-5 py-6 sm:px-7 sm:py-8"
        style={{
          background: "var(--hero-bg)",
          borderColor: "var(--card-border)",
          boxShadow: "0 12px 32px rgba(15,23,42,0.06)",
        }}
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <span
              className="inline-flex h-8 items-center rounded-full border px-3 text-[12px] font-semibold"
              style={{
                color: "var(--accent)",
                background: "var(--nav-pill-bg)",
                borderColor: "var(--nav-pill-border)",
              }}
            >
              站长工具与效率工具指南
            </span>
            <h1 className="mt-4 text-[26px] font-black leading-tight sm:text-[34px]" style={{ color: "var(--foreground)" }}>
              百宝箱：从上线检查到工具安全使用的实用指南
            </h1>
            <div className="mt-4 space-y-3 text-sm leading-7 sm:text-[15px]" style={{ color: "var(--muted)" }}>
              {heroParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside
            className="rounded-xl border p-4"
            style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
          >
            <h2 className="text-[16px] font-bold" style={{ color: "var(--foreground)" }}>
              审核期内容结构
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-6" style={{ color: "var(--muted)" }}>
              <p>24 篇核心指南，覆盖站长工具、上线部署、文件处理、图片处理、开发辅助、安全使用和效率办公。</p>
              <p>12 个精选工具详情页，每个页面提供差异化说明和安全边界。</p>
              <p>sitemap 只提交高质量页面，薄页面保留功能但不作为审核期核心入口。</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {topicLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
          >
            <h2 className="text-[17px] font-bold" style={{ color: "var(--foreground)" }}>
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
              {item.text}
            </p>
          </Link>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-[20px] font-black" style={{ color: "var(--foreground)" }}>
              原创工具指南
            </h2>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              每篇都围绕具体任务写检查步骤、命令示例、常见错误和安全边界。
            </p>
          </div>
          <Link href="/guides" className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
            查看全部
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {guidePreview.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
            >
              <div className="text-[12px] font-semibold" style={{ color: "var(--accent)" }}>
                {guide.group}
              </div>
              <h3 className="mt-2 text-[17px] font-bold leading-6" style={{ color: "var(--foreground)" }}>
                {guide.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <CategorySection id="featured" title="精选工具详解" resources={featured} icon="★" />

      <section className="space-y-4">
        <h2 className="text-[20px] font-black" style={{ color: "var(--foreground)" }}>
          常见问题
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border p-5"
              style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
            >
              <h3 className="text-[16px] font-bold leading-6" style={{ color: "var(--foreground)" }}>
                {item.question}
              </h3>
              <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
