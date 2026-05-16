import { getResourcesByCategory, getSubcategoriesByCategory } from "@/data/resources";
import CategorySection from "@/components/CategorySection";
import SectionNav from "@/components/SectionNav";

export const metadata = {
  title: "摸鱼专区 - 百宝箱",
  description: "摸鱼休闲好去处，工作之余放松一下",
};

export default function MoyuPage() {
  const allResources = getResourcesByCategory("moyu");
  const subcategories = getSubcategoriesByCategory("moyu");
  const sections = subcategories.map((sub, index) => ({
    id: `section-${index}`,
    title: sub,
    items: allResources.filter((r) => r.subcategory === sub),
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

      {sections.map((section) => (
        <CategorySection key={section.id} id={section.id} title={section.title} resources={section.items} />
      ))}
    </div>
  );
}
