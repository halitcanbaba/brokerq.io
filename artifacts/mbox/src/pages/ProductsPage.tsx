import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import ParticlesBackground from "@/components/background/ParticlesBackground";
import Navbar from "@/components/layout/Navbar";
import Seo, { SITE } from "@/components/Seo";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import type { Category } from "@/types";

const categories: Category[] = ["All", "Platform", "Trading", "Migration", "Risk", "CRM", "Portal", "Infrastructure", "Gateway", "Consulting"];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "brokerQ.io Products & Services",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.baseUrl}/products/${p.id}`,
      name: p.title,
    })),
  };

  const filtered = products.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen text-foreground dark">
      <Seo
        title="MetaTrader Solutions & FX Broker Products"
        description="Browse the full catalogue of brokerQ.io products: MT4/MT5 installation, migration tools, copy trading, PAMM/MAMM plugins, risk management, CRM integration, client portal, crypto gateway and more."
        keywords={[
          "MetaTrader products",
          "MT4 MT5 plugins",
          "FX broker software",
          "copy trading plugin",
          "MT4 MT5 migration tool",
          "broker CRM",
        ]}
        jsonLd={[itemListSchema]}
      />
      <ParticlesBackground />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0ea5e9] border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 px-4 py-1.5 rounded-full mb-6">
              Product Catalog
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Enterprise Broker<br />
              <span className="text-[#00d4aa]">Solutions</span>
            </h1>
            <p className="text-[#a7a7b8] text-lg max-w-2xl mx-auto">
              Purpose-built tools and services for FX broker operators — from platform installation to real-time risk management.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            className="max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a7a7b8]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products and services..."
                aria-label="Search broker products and services"
                data-testid="input-products-search"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#111127] border border-[#2a2a4a] text-white placeholder-[#a7a7b8] focus:outline-none focus:border-[#00d4aa]/60 transition-colors text-sm"
              />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap gap-2 justify-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`filter-${cat.toLowerCase()}`}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === cat
                    ? "bg-[#00d4aa] text-[#0a0a1a] border-[#00d4aa]"
                    : "bg-[#111127] text-[#a7a7b8] border-[#2a2a4a] hover:border-[#00d4aa]/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Products Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-[#a7a7b8] text-lg">No products match your search.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="mt-4 text-[#00d4aa] hover:underline text-sm"
                data-testid="btn-clear-filters"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
