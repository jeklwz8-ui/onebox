import Link from "next/link";
import { navGroups } from "@/data/navigation";
import {
  getFeaturedResources,
  getResourceStats,
  getResourcesByCategory,
} from "@/data/resources";
import CategorySection from "@/components/CategorySection";
import SectionNav from "@/components/SectionNav";

function uniqueById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function getGroupResources(ids: string[], limit: number) {
  return uniqueById(
    ids
      .filter((id) => id !== "home")
      .flatMap((id) => getResourcesByCategory(id))
  ).slice(0, limit);
}

export default function HomePage() {
  const featured = getFeaturedResources(24);
  const stats = getResourceStats();
  const groupSections = navGroups.slice(1).map((group) => ({
    group,
    items: getGroupResources(group.ids, 18),
  }));

  return (
    <div className="space-y-8">
      <section
        className="relative overflow-hidden rounded-2xl border px-4 py-2.5 sm:px-5"
        style={{ background: "var(--hero-bg)", borderColor: "var(--card-border)" }}
      >
        <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {navGroups.slice(1).map((group) => (
              <a
                key={group.key}
                href={group.href}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-bold leading-none transition-all hover:-translate-y-0.5 hover:shadow-sm"
                style={{
                  background: "var(--nav-pill-bg)",
                  borderColor: "var(--nav-pill-border)",
                  boxShadow: "var(--nav-pill-shadow)",
                  color: "var(--foreground)",
                }}
              >
                <span className="text-[15px] leading-none">{group.icon}</span>
                {group.label}
              </a>
            ))}
          </div>
          <HeroStat label="资源" value={stats.total} />
        </div>
        <div
          className="pointer-events-none absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full blur-3xl"
          style={{ background: "var(--hero-glow)" }}
        />
      </section>

      <section
        className="rounded-2xl border px-5 py-5 sm:px-6"
        style={{
          background: "var(--card)",
          borderColor: "var(--card-border)",
          boxShadow: "0 12px 32px rgba(15,23,42,0.06)",
        }}
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <span
              className="inline-flex h-8 items-center rounded-full border px-3 text-[12px] font-semibold"
              style={{
                color: "var(--accent)",
                background: "var(--nav-pill-bg)",
                borderColor: "var(--nav-pill-border)",
              }}
            >
              工具导航与使用指南
            </span>
            <h1 className="mt-3 text-[24px] font-black leading-tight sm:text-[30px]" style={{ color: "var(--foreground)" }}>
              百宝箱：把常用在线工具整理成清晰的效率工作台
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 sm:text-[15px]" style={{ color: "var(--muted)" }}>
              百宝箱面向开发者、站长、设计协作和日常办公用户，整理 AI 工具、开发调试、文本处理、图片处理、文档转换、云服务和学习资源。每个入口都尽量保留名称、分类和用途说明，帮助用户先理解工具适合解决什么问题，再决定是否打开使用。
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 sm:text-[15px]" style={{ color: "var(--muted)" }}>
              使用在线工具时，建议先判断数据敏感程度。公开内容、测试样例和临时格式转换可以使用在线工具快速处理；合同、账号、密钥、客户资料、未公开代码和生产日志，应优先选择本地软件或可信系统。本站的目标不是堆砌外链，而是把常见工具按任务场景组织起来，减少重复搜索和误点成本。
            </p>
          </div>
          <div
            className="rounded-xl border p-4"
            style={{ background: "var(--bg-secondary)", borderColor: "var(--card-border)" }}
          >
            <h2 className="text-[15px] font-bold" style={{ color: "var(--foreground)" }}>
              推荐使用方式
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-6" style={{ color: "var(--muted)" }}>
              <p>
                <strong style={{ color: "var(--foreground)" }}>按任务找工具：</strong>
                先选择开发、效率、设计、学习等模块，再根据描述判断入口是否匹配当前任务。
              </p>
              <p>
                <strong style={{ color: "var(--foreground)" }}>收藏高频入口：</strong>
                对长期稳定、结果可靠的工具加入收藏，减少下一次处理同类问题的搜索时间。
              </p>
              <p>
                <strong style={{ color: "var(--foreground)" }}>阅读原创指南：</strong>
                进入
                <Link className="mx-1 font-semibold" href="/guides" style={{ color: "var(--accent)" }}>
                  使用指南
                </Link>
                了解文件处理、图片处理、在线工具安全和站长检测的基础方法。
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionNav
        items={[
          { id: "featured", label: "精选资源", icon: "⭐", count: featured.length },
          ...groupSections.map(({ group, items }) => ({
            id: `section-${group.key}`,
            label: `${group.label}模块`,
            icon: group.icon,
            count: items.length,
          })),
        ]}
      />

      <CategorySection id="featured" title="精选资源" resources={featured} icon="⭐" />

      {groupSections.map(({ group, items }) => {
        return (
          <CategorySection
            key={group.key}
            id={`section-${group.key}`}
            title={`${group.label}模块`}
            resources={items}
            icon={group.icon}
          />
        );
      })}
    </div>
  );
}

function HeroStat({ label, value }: { label: string; value: number }) {
  return (
    <div
      className="w-fit min-w-20 rounded-xl border px-4 py-1.5 text-center backdrop-blur sm:shrink-0"
      style={{ background: "var(--hero-stat-bg)", borderColor: "var(--card-border)" }}
    >
      <div className="text-base font-black tabular-nums leading-5" style={{ color: "var(--foreground)" }}>
        {value.toLocaleString("zh-CN")}
      </div>
      <div className="text-[11px] font-medium leading-4" style={{ color: "var(--muted)" }}>
        {label}
      </div>
    </div>
  );
}
