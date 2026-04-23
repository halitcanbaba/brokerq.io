import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Copy,
  PieChart,
  Shield,
  RefreshCcw,
  Wallet,
  CalendarClock,
  Wrench,
  Check,
  Puzzle,
  Layers,
  Cpu,
} from "lucide-react";
import ParticlesBackground from "@/components/background/ParticlesBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import Seo, { SITE, canonicalFor } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { productDetails } from "@/data/product-details";

/**
 * Plugin hub page — targets the generic "MetaTrader plugin" / "MT4 MT5 plugin
 * development" search queries and consolidates link equity to all plugin
 * product pages via internal linking.
 */

const PLUGIN_IDS: Array<{ id: string; icon: typeof Copy }> = [
  { id: "copytrader-tool", icon: Copy },
  { id: "pamm-mamm-plugins", icon: PieChart },
  { id: "proptrade-tool", icon: Shield },
  { id: "risk-monitoring-system", icon: Shield },
  { id: "holiday-swap-manager", icon: CalendarClock },
  { id: "group-spread-swap-analyzer", icon: Layers },
  { id: "crypto-gateway", icon: Wallet },
  { id: "crm-integrated", icon: RefreshCcw },
];

const CAPABILITIES = [
  {
    icon: Cpu,
    title: "Manager API plugins",
    body: "Custom plugins that hook into the MT4 Manager API and MT5 Gateway API to automate dealing desk operations, risk rules, and client lifecycle events.",
  },
  {
    icon: Wrench,
    title: "Bridge & gateway integrations",
    body: "FIX/REST liquidity bridges, LP aggregation, and custom quote-routing plugins engineered for low-latency execution and deterministic slippage.",
  },
  {
    icon: Puzzle,
    title: "Bespoke MT4 / MT5 plugins",
    body: "From swap recommendation engines to custom reporting modules — purpose-built plugins that extend MetaTrader far beyond its defaults.",
  },
];

export default function MetaTraderPluginsPage() {
  const canonical = canonicalFor("/services/metatrader-plugins");

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "MetaTrader Plugin Development",
    serviceType: "Custom MT4 & MT5 plugin development for FX brokers",
    description:
      "Custom MetaTrader 4 and MetaTrader 5 plugin development: copy trading, PAMM/MAMM, risk management, holiday & swap control, crypto gateway and bespoke manager API plugins.",
    provider: {
      "@type": "Organization",
      name: SITE.siteName,
      url: SITE.baseUrl,
    },
    areaServed: "Worldwide",
    url: canonical,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.baseUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.baseUrl}/services/metatrader-plugins` },
      { "@type": "ListItem", position: 3, name: "MetaTrader Plugins", item: canonical },
    ],
  };

  const faqs = [
    {
      question: "What is a MetaTrader plugin?",
      answer:
        "A MetaTrader plugin is a server-side module that hooks into the MT4 Manager API or the MT5 Gateway / Manager API to extend platform behaviour. Plugins can automate dealing desk actions, enforce risk rules, stream data to external systems, integrate payment flows, or add entirely new products (copy trading, PAMM/MAMM, prop trading) on top of the base platform.",
    },
    {
      question: "Do you develop plugins for both MetaTrader 4 and MetaTrader 5?",
      answer:
        "Yes. We build and maintain plugins for both MT4 and MT5 (hedging and netting). Many of our catalogue plugins \u2014 Copytrader, PAMM/MAMM, Risk Monitoring, Holiday & Swap Manager \u2014 ship with first-class support for both platforms from day one.",
    },
    {
      question: "Can you build a custom plugin from scratch?",
      answer:
        "Absolutely. Starting from a discovery workshop we scope the plugin, agree on performance and reliability SLAs, and deliver fully tested code along with runbooks, monitoring and ongoing support. Typical bespoke plugin projects ship in 4\u201312 weeks.",
    },
    {
      question: "Will a plugin affect trade server performance?",
      answer:
        "Only if built poorly. Our plugins are written in native C++ for MT4 and C++/.NET for MT5 with strict latency budgets, non-blocking I/O and deterministic memory profiles. Every plugin is load-tested against production-like trading volumes before go-live.",
    },
    {
      question: "Do you provide ongoing support and maintenance for plugins?",
      answer:
        "Yes. Every plugin ships with support options ranging from community-level email support to a 24/7 managed SLA. We also handle compatibility updates when MetaQuotes releases new MT4/MT5 builds so your plugins keep working across upgrades.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const pluginProducts = PLUGIN_IDS.map(({ id, icon }) => {
    const product = products.find((p) => p.id === id);
    const detail = productDetails[id];
    return product && detail ? { product, detail, Icon: icon } : null;
  }).filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="relative min-h-screen text-foreground dark">
      <Seo
        title="MetaTrader Plugin Development — MT4 & MT5 Custom Plugins for Brokers"
        description="Custom MetaTrader 4 and MetaTrader 5 plugin development for FX brokers: copy trading, PAMM/MAMM, risk management, holiday & swap control, crypto gateway and bespoke manager API extensions."
        keywords={[
          "MetaTrader plugin",
          "MT4 plugin development",
          "MT5 plugin development",
          "custom MetaTrader plugin",
          "MT5 manager API plugin",
          "MetaTrader gateway development",
          "copy trading plugin",
          "PAMM MAMM plugin",
        ]}
        canonical={canonical}
        jsonLd={[serviceSchema, breadcrumbSchema, faqSchema]}
      />
      <ParticlesBackground />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumb items={[{ label: "Services", href: "/services/metatrader-plugins" }, { label: "MetaTrader Plugins" }]} />
        </div>

        {/* Hero */}
        <section className="container mx-auto px-4 md:px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0ea5e9] border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 px-4 py-1.5 rounded-full mb-6">
              MetaTrader Plugins
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              MetaTrader plugin development
              <br />
              <span className="text-[#00d4aa]">for MT4 & MT5 brokers</span>
            </h1>
            <p className="text-lg md:text-xl text-[#a7a7b8] max-w-3xl mx-auto leading-relaxed">
              Production-grade MT4 and MT5 plugins that extend your MetaTrader server with
              copy trading, PAMM/MAMM, risk management, bridges, gateways and fully bespoke
              logic \u2014 written by engineers who have deployed MetaTrader infrastructure
              for 50+ regulated brokerages.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto bg-[#00d4aa] hover:bg-[#00b38f] text-[#0a0a1a] font-bold px-8 h-14 text-lg">
                  Discuss a plugin project
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#2a2a4a] text-white hover:bg-[#2a2a4a] hover:text-white px-8 h-14 text-lg">
                  Browse all products
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Capabilities */}
        <section className="container mx-auto px-4 md:px-6 mb-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center">
              What we build
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CAPABILITIES.map((c) => (
                <div
                  key={c.title}
                  className="bg-[#111127] border border-[#2a2a4a] rounded-2xl p-8"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0a0a1a] border border-[#2a2a4a] flex items-center justify-center mb-5 text-[#00d4aa]">
                    <c.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{c.title}</h3>
                  <p className="text-[#a7a7b8] leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ready-made plugins grid */}
        <section className="container mx-auto px-4 md:px-6 mb-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-center">
              Ready-made MT4 & MT5 plugins
            </h2>
            <p className="text-[#a7a7b8] text-center max-w-2xl mx-auto mb-12">
              Battle-tested plugin products you can license and deploy today \u2014 each
              with full source-of-truth documentation, monitoring and broker-grade SLAs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pluginProducts.map(({ product, detail, Icon }) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="bg-[#111127] border border-[#2a2a4a] hover:border-[#00d4aa]/40 rounded-2xl p-6 transition-colors group cursor-pointer h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#0a0a1a] border border-[#2a2a4a] flex items-center justify-center flex-shrink-0 text-[#00d4aa] group-hover:border-[#00d4aa]/50 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-white">{detail.headline}</h3>
                          <ArrowRight className="w-4 h-4 text-[#a7a7b8] group-hover:text-[#00d4aa] transition-colors flex-shrink-0" />
                        </div>
                        <p className="text-[#a7a7b8] text-sm leading-relaxed">
                          {detail.subtitle}
                        </p>
                        {detail.platforms && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {detail.platforms.map((p) => (
                              <span
                                key={p}
                                className="text-[10px] font-semibold uppercase tracking-wider text-[#0ea5e9] border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 px-2 py-0.5 rounded"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why brokerQ */}
        <section className="border-y border-[#2a2a4a] bg-[#111127]/60 py-20 mb-24">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center">
              Why brokers trust our plugins
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Native C++ / .NET \u2014 no interpreted layers in the hot path",
                "First-class support for both MT4 and MT5 (hedging + netting)",
                "Compatible with all current MT4 (1220+) and MT5 (3815+) builds",
                "Monitoring, runbooks and alerting included with every plugin",
                "Regulator-friendly audit logs and change management",
                "Proven at brokerages running 6+ figure monthly trade volumes",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00d4aa] mt-0.5 flex-shrink-0" />
                  <span className="text-[#a7a7b8] leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 md:px-6 mb-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group border border-[#2a2a4a] rounded-xl overflow-hidden"
                >
                  <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#111127]/60 transition-colors">
                    <span className="text-white font-semibold leading-snug pr-4">{faq.question}</span>
                    <span className="text-[#00d4aa] text-xl leading-none flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="px-6 pb-5 text-[#a7a7b8] leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center bg-[#111127] border border-[#2a2a4a] rounded-3xl p-10 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Got a plugin idea? Let\u2019s scope it.
            </h2>
            <p className="text-[#a7a7b8] mb-8">
              Tell us about your MetaTrader setup and the plugin you need \u2014 we\u2019ll
              come back within one business day with a concrete proposal.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#00d4aa] hover:bg-[#00b38f] text-[#0a0a1a] font-bold px-8">
                Start a plugin project
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
