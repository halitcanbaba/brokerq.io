import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { Category } from "@/types";
import ProductCard from "@/components/ui/ProductCard";

interface ProductsGridProps {
  searchQuery: string;
}

const categories: Category[] = ["All", "Platform", "Trading", "Migration", "Risk", "CRM", "Portal", "Infrastructure", "Gateway", "Consulting"];

export default function ProductsGrid({ searchQuery }: ProductsGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section id="products" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Brokerage Infrastructure</h2>
          <p className="text-[#a7a7b8] max-w-2xl">Discover our suite of institutional-grade broker plugins and services.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              data-testid={`filter-${category.toLowerCase()}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border ${
                activeCategory === category
                  ? "bg-[#00d4aa]/10 text-[#00d4aa] border-[#00d4aa] shadow-[0_0_15px_rgba(0,212,170,0.2)]"
                  : "bg-[#111127] text-[#a7a7b8] border-[#2a2a4a] hover:border-[#0ea5e9] hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-[#a7a7b8] text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
