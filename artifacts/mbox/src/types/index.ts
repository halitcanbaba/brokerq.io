export type Category = "All" | "Platform" | "Migration" | "Risk" | "CRM" | "Portal" | "Infrastructure" | "Trading" | "Gateway" | "Consulting" | "Reporting";

export interface Product {
  id: string;
  title: string;
  description: string;
  category: Category;
  icon: string;
}
