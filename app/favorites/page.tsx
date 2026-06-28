import { resources } from "@/data/resources";
import FavoritesClient from "@/components/FavoritesClient";

export const metadata = {
  title: "收藏 - 百宝箱",
  robots: {
    index: false,
    follow: true,
  },
};

export default function FavoritesPage() {
  return <FavoritesClient resources={resources} />;
}
