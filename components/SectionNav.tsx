interface SectionNavItem {
  id: string;
  label: string;
  icon?: string;
  count?: number;
}

interface SectionNavProps {
  items: SectionNavItem[];
}

export default function SectionNav({ items }: SectionNavProps) {
  if (items.length === 0) return null;

  return (
    <nav
      className="sticky top-0 z-40 -mx-5 mb-6 border-b px-5 py-1.5 backdrop-blur sm:-mx-6 sm:px-6"
      style={{
        background: "var(--section-nav-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center">
        <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto py-px">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="inline-flex h-[26px] shrink-0 items-center gap-1.5 rounded-full border px-3 text-[13px] font-bold leading-none transition-colors hover:border-[var(--accent)]"
              style={{
                background: "var(--nav-pill-bg)",
                borderColor: "var(--nav-pill-border)",
                color: "var(--foreground)",
              }}
            >
              {item.icon && <span className="text-[15px] leading-none">{item.icon}</span>}
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
