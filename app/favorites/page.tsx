import { resources } from "@/data/resources";
import FavoritesClient from "@/components/FavoritesClient";

export default function FavoritesPage() {
  return <FavoritesClient resources={resources} />;
}
