import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Activity,
  ArrowLeftRight,
  ArrowRightLeft,
  BarChart3,
  Bell,
  Box,
  CalendarClock,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  DatabaseBackup,
  FileCheck,
  Filter,
  FolderOpen,
  Gauge,
  Globe,
  History,
  LayoutDashboard,
  LineChart,
  Network,
  Paintbrush,
  PieChart,
  Puzzle,
  RefreshCcw,
  Server,
  Shield,
  ShieldCheck,
  TrendingUp,
  Trophy,
  Undo2,
  UserCheck,
  UserPlus,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import ParticlesBackground from "@/components/background/ParticlesBackground";

const iconMap: Record<string, LucideIcon> = {
  Activity, ArrowLeftRight, ArrowRightLeft, BarChart3, Bell, Box, CalendarClock,
  CheckCircle2, Clock, Copy, DatabaseBackup, FileCheck, Filter, FolderOpen, Gauge,
  Globe, History, LayoutDashboard, LineChart, Network, Paintbrush, PieChart, Puzzle,
  RefreshCcw, Server, Shield, ShieldCheck, TrendingUp, Trophy, Undo2, UserCheck,
  UserPlus, Users, Wallet, Wrench,
};
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import Seo, { canonicalFor, SITE } from "@/components/Seo";
import { products } from "@/data/products";
import { productDetails } from "@/data/product-details";
import { useState } from "react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface ProductDetailPageProps {
  id: string;
}

export default function ProductDetailPage({ id }: ProductDetailPageProps) {
  const product = products.find((p) => p.id === id);
  const detail = productDetails[id];

  if (!product || !detail) {
    return (
      <div className="relative min-h-screen text-foreground dark">
        <Seo
          title="Product not found"
          description="The product you're looking for doesn't exist. Browse our MetaTrader plugins, migration tools and broker infrastructure solutions."
          noIndex
        />
        <ParticlesBackground />
        <Navbar />
        <main className="relative z-10 pt-32 pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Product not found</h1>
            <Link href="/products">
              <Button className="bg-[#00d4aa] hover:bg-[#00b38f] text-[#0a0a1a] font-semibold">
                Back to Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const HeroIcon = iconMap[product.icon] ?? Box;
  const canonical = canonicalFor(`/products/${product.id}`);
  const seoTitle = detail.seoTitle ?? detail.headline;
  const seoDescription =
    detail.metaDescription ?? detail.subtitle.slice(0, 160);
  const schemaType = detail.schemaType ?? "SoftwareApplication";

  const productSchema: Record<string, unknown> =
    schemaType === "Service"
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: detail.headline,
          serviceType: product.category,
          description: detail.subtitle,
          provider: {
            "@type": "Organization",
            name: SITE.siteName,
            url: SITE.baseUrl,
          },
          areaServed: "Worldwide",
          url: canonical,
        }
      : {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: detail.headline,
          applicationCategory: "BusinessApplication",
          operatingSystem: detail.platforms?.join(", ") ?? "MetaTrader 4, MetaTrader 5",
          description: detail.subtitle,
          url: canonical,
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "USD",
            price: "0",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              description: "Contact sales for pricing",
            },
          },
          brand: {
            "@type": "Brand",
            name: SITE.siteName,
          },
        };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.baseUrl },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE.baseUrl}/products` },
      { "@type": "ListItem", position: 3, name: detail.headline, item: canonical },
    ],
  };

  const jsonLd: Array<Record<string, unknown>> = [productSchema, breadcrumbSchema];

  if (detail.faqs && detail.faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: detail.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return (
    <div className="relative min-h-screen text-foreground dark">
      <Seo
        title={seoTitle}
        description={seoDescription}
        keywords={detail.seoKeywords}
        canonical={canonical}
        ogType="product"
        jsonLd={jsonLd}
      />
      <ParticlesBackground />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumb items={[{ label: "Products", href: "/products" }, { label: product.title }]} />
        </div>

        {/* Hero */}
        <section className="container mx-auto px-4 md:px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-[#00d4aa] mb-8">
              <HeroIcon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              {detail.headline}
            </h1>
            <p className="text-lg md:text-xl text-[#a7a7b8] max-w-3xl mx-auto leading-relaxed">
              {detail.subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#00d4aa] hover:bg-[#00b38f] text-[#0a0a1a] font-bold px-8 h-14 text-lg"
                >
                  Request a Demo
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-[#2a2a4a] text-white hover:bg-[#2a2a4a] hover:text-white px-8 h-14 text-lg"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 md:px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Key Features</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {detail.features.map((f) => {
              const FIcon = iconMap[f.icon] ?? Box;
              return (
                <motion.div
                  key={f.title}
                  variants={itemVariants}
                  className="bg-[#111127] border border-[#2a2a4a] rounded-2xl p-8 hover:border-[#00d4aa]/40 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0a0a1a] border border-[#2a2a4a] flex items-center justify-center mb-5 text-[#00d4aa] group-hover:border-[#00d4aa]/50 transition-colors">
                    <FIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-[#a7a7b8] leading-relaxed">{f.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Benefits */}
        <section className="border-y border-[#2a2a4a] bg-[#111127]/60 py-20 mb-24">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center">
                Why brokers choose this
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {detail.benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-[#00d4aa] mt-0.5 flex-shrink-0" />
                    <span className="text-[#a7a7b8] leading-relaxed">{b}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="container mx-auto px-4 md:px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center">
              Ideal for
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {detail.useCases.map((uc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#111127] border border-[#2a2a4a] rounded-2xl p-6 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 flex items-center justify-center mx-auto mb-4 text-[#00d4aa]">
                    <span className="font-bold text-sm">{i + 1}</span>
                  </div>
                  <p className="text-[#a7a7b8] leading-relaxed">{uc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Long-form description (SEO content) */}
        {detail.longDescription && (
          <section className="container mx-auto px-4 md:px-6 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 text-center">
                Overview
              </h2>
              <p className="text-[#a7a7b8] text-lg leading-relaxed">
                {detail.longDescription}
              </p>
            </motion.div>
          </section>
        )}

        {/* Specs table */}
        {detail.specs && detail.specs.length > 0 && (
          <section className="container mx-auto px-4 md:px-6 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center">
                At a glance
              </h2>
              <div className="bg-[#111127] border border-[#2a2a4a] rounded-2xl overflow-hidden">
                <dl className="divide-y divide-[#2a2a4a]">
                  {detail.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4"
                    >
                      <dt className="text-[#a7a7b8] text-sm font-medium">{spec.label}</dt>
                      <dd className="sm:col-span-2 text-white leading-relaxed">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </section>
        )}

        {/* Product-specific FAQ */}
        {detail.faqs && detail.faqs.length > 0 && (
          <section className="container mx-auto px-4 md:px-6 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center">
                Frequently asked questions
              </h2>
              <ProductFaqList faqs={detail.faqs} />
            </motion.div>
          </section>
        )}

        {/* Related Products */}
        <section className="container mx-auto px-4 md:px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Related Solutions</h2>
            <p className="text-[#a7a7b8]">Explore other tools that work alongside {product.title}.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-[#111127] border border-[#2a2a4a] rounded-3xl p-10 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(0,212,170,0.15) 0%, transparent 70%)' }} />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
              Ready to get started?
            </h2>
            <p className="text-[#a7a7b8] mb-8 relative z-10">
              Schedule a demo and see {product.title} in action.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#00d4aa] hover:bg-[#00b38f] text-[#0a0a1a] font-bold px-8"
                >
                  Schedule Demo
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-[#2a2a4a] text-white hover:bg-[#2a2a4a] hover:text-white px-8"
                >
                  All Products
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/** Collapsible product-level FAQ list. */
function ProductFaqList({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <ProductFaqItem key={faq.question} faq={faq} index={i} />
      ))}
    </div>
  );
}

function ProductFaqItem({
  faq,
  index,
}: {
  faq: { question: string; answer: string };
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border border-[#2a2a4a] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#111127]/60 transition-colors"
        aria-expanded={open}
      >
        <span className="text-white font-semibold leading-snug pr-4">{faq.question}</span>
        <span
          className={`text-[#00d4aa] text-xl leading-none flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden
        >
          +
        </span>
      </button>
      {open && (
        <p className="px-6 pb-5 text-[#a7a7b8] leading-relaxed">{faq.answer}</p>
      )}
    </div>
  );
}
