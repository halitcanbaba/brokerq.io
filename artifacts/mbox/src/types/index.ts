export type Category = "All" | "Platform" | "Migration" | "Risk" | "CRM" | "Portal" | "Infrastructure";

export interface Product {
  id: string;
  title: string;
  description: string;
  category: Category;
  icon: string;
}
