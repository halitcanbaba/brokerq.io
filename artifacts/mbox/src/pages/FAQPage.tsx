import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ParticlesBackground from "@/components/background/ParticlesBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    category: "Platform",
    question: "What is the typical timeline for a full MT4/MT5 platform installation?",
    answer: "A standard deployment takes 3–5 business days from kick-off to production launch. This includes server provisioning, trade server configuration, plugin installation, security hardening, and a full load test. Complex multi-server setups with custom gateway configurations may take up to 10 business days.",
  },
  {
    category: "Platform",
    question: "Do you support both MT4 and MT5, or only one platform?",
    answer: "We fully support both MetaTrader 4 and MetaTrader 5, including hybrid setups where brokers run both platforms in parallel. Our tooling handles cross-platform data migration, unified risk monitoring, and shared CRM integration across both environments.",
  },
  {
    category: "Migration",
    question: "Is it possible to migrate from MT4 to MT5 without any trading downtime?",
    answer: "Yes. Our migration tool uses a staged approach: accounts and history are pre-migrated while the MT4 environment stays live. Open positions are transferred during a brief cut-over window using a price-lock mechanism that eliminates slippage. Total client impact is typically under 60 seconds.",
  },
  {
    category: "Migration",
    question: "What data is preserved during a migration?",
    answer: "All critical data is migrated: client accounts, balances, leverage settings, group configurations, complete trade history, closed orders, deal records, equity curves, and open positions. We also migrate custom plugin settings and manager-level permissions.",
  },
  {
    category: "Risk",
    question: "How does the risk monitoring system handle A-book and B-book exposure?",
    answer: "The system provides real-time aggregated exposure views segmented by book type. For A-book flow, it tracks LP fill rates, slippage, and hedge ratios. For B-book, it monitors net client exposure by symbol, flags unusual trading patterns, and calculates optimal hedging thresholds. All alerts are configurable by symbol, group, and exposure tier.",
  },
  {
    category: "Risk",
    question: "Can the risk system integrate with our existing liquidity providers?",
    answer: "Yes. We support integration with all major LPs including LMAX, Currenex, Integral, PrimeXM, and custom FIX/REST bridges. The system pulls real-time pricing and fill data to calculate actual vs. expected exposure and hedge efficiency.",
  },
  {
    category: "CRM",
    question: "Which CRM platforms do you integrate with?",
    answer: "We provide native integrations for Salesforce, HubSpot, and Zoho CRM. For other platforms, our REST API and webhook framework enable bi-directional sync with any CRM that supports API access. Custom integrations are typically delivered within 2–3 weeks.",
  },
  {
    category: "CRM",
    question: "How does automated KYC work within the CRM integration?",
    answer: "When a new lead enters the CRM, our workflow engine triggers document collection, identity verification (via Onfido, Jumio, or SumSub), and compliance checks. Approved clients automatically receive a trading account provisioned with the correct group, leverage, and currency settings — reducing onboarding from days to minutes.",
  },
  {
    category: "Infrastructure",
    question: "What does your 99.9% uptime SLA actually guarantee?",
    answer: "Our SLA guarantees no more than 8.76 hours of unplanned downtime per year, backed by financial credits. This covers all managed infrastructure: trade servers, access servers, and gateway components. Planned maintenance windows are excluded and scheduled during low-volume hours with advance notice.",
  },
  {
    category: "Infrastructure",
    question: "Do you provide disaster recovery and backup services?",
    answer: "Yes. Every managed deployment includes automated daily backups with point-in-time recovery, geo-redundant storage across at least two regions, and tested restore procedures. Recovery time objective (RTO) is under 4 hours; recovery point objective (RPO) is under 1 hour.",
  },
  {
    category: "General",
    question: "What makes brokerQ.io different from other FX technology vendors?",
    answer: "We are practitioners, not consultants. Our team has spent 12+ years deployed inside FX brokerages — building, maintaining, and scaling trading infrastructure. We don't offer generic IT services; every product is purpose-built for the specific operational challenges of running a regulated brokerage.",
  },
  {
    category: "General",
    question: "How do I get started with brokerQ.io?",
    answer: "Start by scheduling a free consultation through our contact page or WhatsApp. We'll assess your current infrastructure, discuss your goals, and recommend a solution — typically within one business day. There are no upfront commitments or long-term contracts required to begin.",
  },
];

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
