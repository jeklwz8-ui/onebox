import { notFound } from "next/navigation";
import { ADSENSE_REVIEW_HIDDEN_CATEGORIES, ADSENSE_REVIEW_MODE } from "@/data/adsense-review";
import { categories } from "@/data/categories";
import {
  getResourcesByCategory,
  getSubcategoriesByCategory,
} from "@/data/resources";
import CategorySection from "@/components/CategorySection";
import SectionNav from "@/components/SectionNav";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories
    .filter((category) => {
      if (category.id === "home") return false;
      return !ADSENSE_REVIEW_MODE || !ADSENSE_REVIEW_HIDDEN_CATEGORIES.has(category.id);
    })
    .map((category) => ({ category: category.id }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = categories.find((item) => item.id === category);
  if (ADSENSE_REVIEW_MODE && ADSENSE_REVIEW_HIDDEN_CATEGORIES.has(category)) return {};
  if (!cat) return {};
  return {
    title: `${cat.label} - 百宝箱`,
    description: cat.description,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = categories.find((item) => item.id === category);
  if (
    !cat ||
    cat.id === "home" ||
    (ADSENSE_REVIEW_MODE && ADSENSE_REVIEW_HIDDEN_CATEGORIES.has(cat.id))
  ) {
    notFound();
  }

  const allResources = getResourcesByCategory(category);
  const subcategories = getSubcategoriesByCategory(category);
  const sections = subcategories.map((sub, index) => ({
    id: `section-${index}`,
    title: sub,
    items: allResources.filter((resource) => resource.subcategory === sub),
  }));

  return (
    <div>
      <SectionNav
        items={sections.map((section) => ({
          id: section.id,
          label: section.title,
          count: section.items.length,
        }))}
      />

      {sections.map((section) => {
        return (
          <CategorySection key={section.id} id={section.id} title={section.title} resources={section.items} />
        );
      })}

      {allResources.length === 0 && (
        <div
          className="text-center py-20 text-sm"
          style={{ color: "var(--muted)" }}
        >
          暂无资源，敬请期待。
        </div>
      )}
    </div>
  );
}
