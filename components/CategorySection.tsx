import type { Resource } from "@/data/resource-types";
import ResourceCard from "./ResourceCard";

interface CategorySectionProps {
  title: string;
  resources: Resource[];
  icon?: string;
  id?: string;
}

export default function CategorySection({
  title,
  resources,
  icon,
  id,
}: CategorySectionProps) {
  if (resources.length === 0) return null;

  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-1 h-6 rounded-full shrink-0"
          style={{ background: "var(--accent)" }}
        />
        {icon && (
          <span className="text-lg leading-none">{icon}</span>
        )}
        <h2
          className="text-lg font-bold tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h2>
        <div
          className="flex-1 h-px"
          style={{ background: "var(--card-border)" }}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] md:gap-4">
        {resources.map((r) => (
          <ResourceCard key={r.id} resource={r} />
        ))}
      </div>
    </section>
  );
}
