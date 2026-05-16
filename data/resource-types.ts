export interface Resource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  subcategory: string;
  icon?: string;
  tags?: string[];
  source?: "manual" | "baoboxs";
  sourceId?: string | number;
  sourceCategory?: string;
  sourceGroup?: string;
  lang?: string;
  charge?: number;
  shortCode?: string;
  requiresLogin?: boolean;
}
