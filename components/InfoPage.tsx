import type { ReactNode } from "react";

type Section = {
  title: string;
  content: ReactNode;
};

type InfoPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: Section[];
  asideTitle: string;
  asideItems: string[];
};

export default function InfoPage({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
  asideTitle,
  asideItems,
}: InfoPageProps) {
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
        <div className="space-y-3">
          <span
            className="inline-flex h-8 items-center rounded-full border px-3 text-[12px] font-semibold"
            style={{
              color: "var(--accent)",
              background: "var(--nav-pill-bg)",
              borderColor: "var(--nav-pill-border)",
            }}
          >
            {eyebrow}
          </span>
          <div className="space-y-2">
            <h1 className="text-2xl font-black sm:text-[30px]" style={{ color: "var(--foreground)" }}>
              {title}
            </h1>
            <p className="max-w-3xl text-sm leading-7 sm:text-[15px]" style={{ color: "var(--muted)" }}>
              {description}
            </p>
          </div>
          <div className="text-[12px] font-medium" style={{ color: "var(--muted)" }}>
            最近更新：{updatedAt}
          </div>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-4">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border px-5 py-5 sm:px-6"
              style={{
                background: "var(--card)",
                borderColor: "var(--card-border)",
              }}
            >
              <h2 className="text-[18px] font-bold sm:text-[20px]" style={{ color: "var(--foreground)" }}>
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-7 sm:text-[15px]" style={{ color: "var(--muted)" }}>
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <aside
          className="h-fit rounded-2xl border px-5 py-5 sm:px-6 lg:sticky lg:top-20"
          style={{
            background: "var(--card)",
            borderColor: "var(--card-border)",
          }}
        >
          <h2 className="text-[16px] font-bold" style={{ color: "var(--foreground)" }}>
            {asideTitle}
          </h2>
          <ul className="mt-3 space-y-2.5 text-sm leading-6" style={{ color: "var(--muted)" }}>
            {asideItems.map((item) => (
              <li key={item} className="flex gap-2">
                <span style={{ color: "var(--accent)" }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
