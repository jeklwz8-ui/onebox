import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InfoPage from "@/components/InfoPage";
import { getPublicToolDetailResources, getToolDetailBySlug } from "@/data/tool-details";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPublicToolDetailResources().map((resource) => ({ slug: resource.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const detail = getToolDetailBySlug(slug);
  if (!detail) return {};

  return {
    title: `${detail.resource.name} 使用指南 - 百宝箱`,
    description: detail.description,
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const detail = getToolDetailBySlug(slug);
  if (!detail) notFound();

  return (
    <InfoPage
      eyebrow="精选工具"
      title={detail.title}
      description={detail.description}
      updatedAt={detail.updatedAt}
      asideTitle="使用要点"
      asideItems={detail.asideItems}
      sections={[
        ...detail.sections.map((section) => ({
          title: section.title,
          content: (
            <>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </>
          ),
        })),
        {
          title: "外部访问",
          content: (
            <div className="space-y-3">
              <p>
                如果你已经确认该工具适合当前任务，可以通过下面的按钮访问官方网站。外部网站的功能、价格和隐私规则可能会变化，使用前仍建议自行核对。
              </p>
              <a
                href={detail.resource.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex h-10 items-center rounded-lg px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                访问 {detail.resource.name}
              </a>
            </div>
          ),
        },
      ]}
    />
  );
}
