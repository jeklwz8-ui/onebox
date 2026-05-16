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
