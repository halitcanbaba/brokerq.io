import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Clock, ChevronRight, ArrowRight } from "lucide-react";
import ParticlesBackground from "@/components/background/ParticlesBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Seo, { SITE } from "@/components/Seo";
import NotFound from "@/pages/not-found";
import { Button } from "@/components/ui/button";
import { getArticle } from "@/data/articles";
import { products } from "@/data/products";

interface ArticlePageProps {
  slug: string;
}

export default function ArticlePage({ slug }: ArticlePageProps) {
  const article = getArticle(slug);

  if (!article) return <NotFound />;

  const canonical = `${SITE.baseUrl}/insights/${article.slug}`;
  const relatedProduct = article.relatedProductId
    ? products.find((p) => p.id === article.relatedProductId)
    : undefined;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: { "@type": "Organization", name: SITE.siteName, url: SITE.baseUrl },
    publisher: {
      "@type": "Organization",
      name: SITE.siteName,
      logo: { "@type": "ImageObject", url: `${SITE.baseUrl}/favicon.svg` },
    },
    mainEntityOfPage: canonical,
    image: `${SITE.baseUrl}/opengraph.jpg`,
    articleSection: article.category,
    keywords: article.seoKeywords.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.baseUrl },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE.baseUrl}/insights` },
      { "@type": "ListItem", position: 3, name: article.title, item: canonical },
    ],
  };

  const faqSchema = article.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <div className="relative min-h-screen text-foreground dark">
      <Seo
        title={article.seoTitle}
        description={article.metaDescription}
        keywords={article.seoKeywords}
        canonical={canonical}
        ogType="article"
        publishedTime={article.datePublished}
        modifiedTime={article.dateModified}
        jsonLd={faqSchema ? [articleSchema, breadcrumbSchema, faqSchema] : [articleSchema, breadcrumbSchema]}
      />
      <ParticlesBackground />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[#a7a7b8] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#00d4aa] transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/insights" className="hover:text-[#00d4aa] transition-colors">Insights</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white truncate">{article.category}</span>
            </nav>

            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-5 text-xs">
                <span className="text-[#0ea5e9] font-semibold uppercase tracking-widest border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="text-[#a7a7b8]/70 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {article.readMinutes} min read
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
                {article.title}
              </h1>
              <p className="text-xl text-[#a7a7b8] leading-relaxed">{article.heroSubtitle}</p>
            </motion.header>

            {/* Body */}
            <article className="space-y-10">
              {article.sections.map((section, i) => (
                <section key={i}>
                  {section.heading && (
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs?.map((p, j) => (
                    <p key={j} className="text-[#c4c4d4] text-lg leading-relaxed mb-4">
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2 mt-2">
                      {section.bullets.map((b, k) => (
                        <li key={k} className="flex gap-3 text-[#c4c4d4] leading-relaxed">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#00d4aa] flex-none" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </article>

            {/* FAQ */}
            {article.faqs.length > 0 && (
              <section className="mt-16 pt-10 border-t border-[#2a2a4a]">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  Frequently asked questions
                </h2>
                <div className="space-y-6">
                  {article.faqs.map((f, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-semibold text-white mb-2">{f.question}</h3>
                      <p className="text-[#a7a7b8] leading-relaxed">{f.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="mt-16 rounded-2xl bg-gradient-to-br from-[#111127] to-[#0a0a1a] border border-[#2a2a4a] p-8 md:p-10 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">
                {relatedProduct ? `Planning a ${relatedProduct.title.toLowerCase()}?` : "Talk to our team"}
              </h2>
              <p className="text-[#a7a7b8] mb-7 max-w-xl mx-auto">
                Get a scoped, no-obligation assessment from the engineers who build and
                run MetaTrader infrastructure for regulated brokers.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button asChild className="bg-[#00d4aa] hover:bg-[#00b38f] text-[#0a0a1a] font-semibold">
                  <Link href="/contact">
                    Request a Consultation <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </Button>
                {relatedProduct && (
                  <Button asChild variant="outline" className="border-[#2a2a4a] text-white hover:border-[#00d4aa] hover:text-[#00d4aa] bg-transparent">
                    <Link href={`/products/${relatedProduct.id}`}>See the {relatedProduct.title}</Link>
                  </Button>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
