import Link from "next/link";
import CategorySection from "@/components/CategorySection";
import { guideArticles } from "@/data/guides";
import { getFeaturedResources, getResourceStats } from "@/data/resources";

const homeGuideParagraphs = [
  "百宝箱是面向开发者、站长、内容创作者和效率用户的工具指南与效率工作台。站点的目标不是把互联网上的入口简单堆在一起，而是围绕真实任务解释工具怎么选、什么时候适合使用、哪些内容不适合上传，以及如何把常用入口沉淀成稳定工作流。用户可以先阅读指南了解判断标准，再进入精选工具详情页，最后按需访问外部网站。",
  "在线工具适合处理公开资料、测试样例、学习练习、低敏文本、图片压缩、格式转换、接口调试、站点检测和临时协作等任务。对于账号密码、API 密钥、合同、客户资料、未公开代码、内部日志、财务数据和个人身份信息，百宝箱建议优先使用本地软件或组织批准的系统。工具越方便，越需要先判断输入内容是否适合交给第三方页面处理。",
  "本站在审核期优先展示低风险、说明清楚、长期稳定的工具入口，并把外部访问放在站内详情页之后。这样用户不会在大量卡片之间盲目跳转，而是先看到工具用途、适用场景、推荐步骤、安全提醒和替代方案。对于第一次访问的用户，这种结构更容易理解站点价值；对于长期用户，也方便把高频工具加入收藏并定期复查。",
  "使用百宝箱时，可以按任务路径浏览：需要处理文档时先看文件处理指南，需要压缩图片时先看图片处理说明，需要调试接口时进入开发辅助内容，需要部署网站时阅读站长工具清单。每条路径都强调先用样例验证、再处理完整内容、最后人工复核结果，避免因为一次性提交大量资料而造成格式错误或隐私风险。",
  "百宝箱会持续维护原创指南、精选工具详情、隐私政策、服务条款和联系方式。站点内容会围绕工具选择、效率办公、文件处理、图片处理、开发辅助、云部署和安全使用展开，不鼓励绕过版权、规避限制或处理不适合公开上传的内容。我们更关注清晰、可复用、低风险的工具使用方法。",
];

const usageCards = [
  {
    title: "先读指南",
    text: "通过指南理解任务场景、输入内容、输出结果和安全边界，避免直接在外部页面反复试错。",
  },
  {
    title: "再看详情",
    text: "进入工具详情页查看用途、步骤、替代方案和注意事项，确认适合当前任务后再访问官网。",
  },
  {
    title: "最后收藏",
    text: "把长期稳定、输出可靠、页面干净的工具加入收藏，定期清理失效或体验变差的入口。",
  },
];

const faqItems = [
  {
    question: "百宝箱为什么减少首页外链数量？",
    answer: "首页重点展示原创说明、指南和精选工具详情，能让用户先理解工具适用场景，再按需访问外部网站。这样比纯卡片列表更清晰，也能减少误点和低价值跳转。",
  },
  {
    question: "哪些内容不建议放到在线工具里处理？",
    answer: "账号、密码、密钥、合同、客户资料、未公开代码、内部日志、财务数据和个人身份信息都不建议粘贴或上传到未知在线工具。",
  },
  {
    question: "工具详情页里的外部按钮是否代表官方合作？",
    answer: "不是。详情页只做用途说明和入口整理。外部网站的价格、功能、隐私规则和可用性可能变化，使用前仍需要自行核对。",
  },
];

export default function HomePage() {
  const featured = getFeaturedResources(12);
  const stats = getResourceStats();
  const guidePreview = guideArticles.slice(0, 9);

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
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <div>
            <span
              className="inline-flex h-8 items-center rounded-full border px-3 text-[12px] font-semibold"
              style={{
                color: "var(--accent)",
                background: "var(--nav-pill-bg)",
                borderColor: "var(--nav-pill-border)",
              }}
            >
              工具指南与效率工作台
            </span>
            <h1 className="mt-4 text-[26px] font-black leading-tight sm:text-[34px]" style={{ color: "var(--foreground)" }}>
              百宝箱工具指南与效率工作台
            </h1>
            <div className="mt-4 space-y-3 text-sm leading-7 sm:text-[15px]" style={{ color: "var(--muted)" }}>
              {homeGuideParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside
            className="rounded-xl border p-4"
            style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
          >
            <h2 className="text-[16px] font-bold" style={{ color: "var(--foreground)" }}>
              当前内容结构
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              <StatItem label="精选工具" value={featured.length} />
              <StatItem label="原创指南" value={guideArticles.length} />
              <StatItem label="公开资源" value={stats.total} />
              <StatItem label="工具分类" value={stats.categoryCount} />
            </dl>
            <div className="mt-4 rounded-lg p-3 text-[13px] leading-6" style={{ background: "var(--search-bg)", color: "var(--muted)" }}>
              审核期首页只展示低风险精选工具，分类页保留浏览能力但不进入 sitemap，搜索结果也会同步过滤。
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {usageCards.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border p-5"
            style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
          >
            <h2 className="text-[17px] font-bold" style={{ color: "var(--foreground)" }}>
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
              {item.text}
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-[20px] font-black" style={{ color: "var(--foreground)" }}>
              原创工具指南
            </h2>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              从任务场景开始，而不是从外部链接开始。
            </p>
          </div>
          <Link href="/guides" className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
            查看全部
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
        <div className="grid gap-4 lg:grid-cols-3">
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

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border p-3" style={{ borderColor: "var(--card-border)" }}>
      <dt className="text-[12px]" style={{ color: "var(--muted)" }}>
        {label}
      </dt>
      <dd className="mt-1 text-xl font-black tabular-nums" style={{ color: "var(--foreground)" }}>
        {value.toLocaleString("zh-CN")}
      </dd>
    </div>
  );
}
