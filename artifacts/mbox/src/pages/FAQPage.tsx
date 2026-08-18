import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ParticlesBackground from "@/components/background/ParticlesBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { faqs, type FAQ } from "@/data/faqs";


const categories = ["All", "Platform", "Migration", "Risk", "CRM", "Infrastructure", "General"];

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="border border-[#2a2a4a] rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#111127]/60 transition-colors"
        aria-expanded={open}
      >
        <span className="text-white font-semibold leading-snug pr-4">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#00d4aa] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-6 pb-5 text-[#a7a7b8] leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? faqs : faqs.filter((f) => f.category === activeCategory);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="relative min-h-screen text-foreground dark">
      <Seo
        title="FAQ — MetaTrader Migration, Plugins & Broker Infrastructure"
        description="Answers to the most common questions about MT4/MT5 platform installation, migration, copy trading, PAMM/MAMM plugins, risk monitoring, CRM integration and managed broker infrastructure."
        keywords={[
          "MetaTrader FAQ",
          "MT4 MT5 migration FAQ",
          "copy trading FAQ",
          "broker risk management",
          "PAMM MAMM FAQ",
        ]}
        jsonLd={[faqSchema]}
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
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0ea5e9] border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 px-4 py-1.5 rounded-full mb-6">
              Knowledge Base
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Frequently Asked<br />
              <span className="text-[#00d4aa]">Questions</span>
            </h1>
            <p className="text-[#a7a7b8] text-lg max-w-2xl mx-auto">
              Everything you need to know about our FX broker infrastructure solutions, platform migration, and managed services.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === cat
                    ? "bg-[#00d4aa] text-[#0a0a1a] border-[#00d4aa]"
                    : "bg-[#111127] text-[#a7a7b8] border-[#2a2a4a] hover:border-[#00d4aa]/40 hover:text-white"
                }`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filtered.map((faq, i) => (
              <FAQItem key={faq.question} faq={faq} index={i} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <p className="text-[#a7a7b8] text-lg mb-6">Still have questions?</p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#00d4aa] hover:bg-[#00b38f] text-[#0a0a1a] font-bold px-8">
                Contact Our Team
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
