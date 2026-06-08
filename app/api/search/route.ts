import { searchResources } from "@/data/resources";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return Response.json([]);
  }

  const results = searchResources(query)
    .slice(0, 12)
    .map((resource) => ({
      id: resource.id,
      name: resource.name,
      url: resource.url,
      description: resource.description,
      category: resource.category,
      subcategory: resource.subcategory,
      icon: resource.icon,
      charge: resource.charge,
    }));

  return Response.json(results, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
