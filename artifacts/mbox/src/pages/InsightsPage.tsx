import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import ParticlesBackground from "@/components/background/ParticlesBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Seo, { SITE } from "@/components/Seo";
import { articles } from "@/data/articles";

export default function InsightsPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "brokerQ.io Insights",
    itemListElement: articles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.baseUrl}/insights/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <div className="relative min-h-screen text-foreground dark">
      <Seo
        title="Insights — Broker Technology Guides & Analysis"
        description="Practical guides and analysis for FX broker operators: MetaTrader migration, risk management, copy trading, PAMM/MAMM, grey/white label and broker infrastructure."
        keywords={[
          "FX broker guides",
          "MetaTrader migration guide",
          "broker technology blog",
          "MT4 MT5 insights",
          "forex broker infrastructure",
        ]}
        jsonLd={[itemListSchema]}
      />
      <ParticlesBackground />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0ea5e9] border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 px-4 py-1.5 rounded-full mb-6">
              <BookOpen className="w-3.5 h-3.5" /> Insights
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Broker Technology,<br />
              <span className="text-[#00d4aa]">Explained</span>
            </h1>
            <p className="text-[#a7a7b8] text-lg max-w-2xl mx-auto">
              Practical, no-nonsense guides for FX broker operators — written by the
              team that builds and runs MetaTrader infrastructure for a living.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {articles.map((a, index) => (
              <motion.article
                key={a.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (index % 2) * 0.08 }}
              >
                <Link
                  href={`/insights/${a.slug}`}
                  className="group flex flex-col h-full bg-[#111127] border border-[#2a2a4a] rounded-2xl p-7 hover:border-[#00d4aa] hover:shadow-[0_0_25px_rgba(0,212,170,0.15)] transition-[border-color,box-shadow] duration-300"
                >
                  <div className="flex items-center gap-3 mb-4 text-xs">
                    <span className="text-[#0ea5e9] font-semibold uppercase tracking-widest">
                      {a.category}
                    </span>
                    <span className="text-[#a7a7b8]/60 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {a.readMinutes} min read
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3 leading-snug group-hover:text-[#00d4aa] transition-colors">
                    {a.title}
                  </h2>
                  <p className="text-[#a7a7b8] leading-relaxed flex-grow">{a.excerpt}</p>
                  <span className="mt-6 inline-flex items-center text-[#00d4aa] font-medium text-sm">
                    Read the guide <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
