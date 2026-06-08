import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InfoPage from "@/components/InfoPage";
import { getGuideBySlug, getGuideSections, guideArticles } from "@/data/guides";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return guideArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuideBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} - 百宝箱`,
    description: article.description,
  };
}

export default async function GuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getGuideBySlug(slug);
  if (!article) notFound();

  return (
    <InfoPage
      eyebrow="原创指南"
      title={article.title}
      description={article.description}
      updatedAt={article.updatedAt}
      asideTitle="阅读要点"
      asideItems={article.asideItems}
      sections={getGuideSections(article).map((section) => ({
        title: section.title,
        content: (
          <>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </>
        ),
      }))}
    />
  );
}
