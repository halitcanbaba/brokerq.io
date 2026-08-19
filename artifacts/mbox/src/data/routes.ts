/**
 * Single source of truth for all indexable routes on brokerq.io.
 *
 * This file is imported by:
 *   - The runtime <Seo /> components (page-level metadata).
 *   - The build-time SEO generator (`scripts/build-seo.mjs`) which produces
 *     `dist/public/sitemap.xml` AND per-route static `index.html` files with
 *     pre-rendered <title>, <meta>, canonical and JSON-LD tags so that
 *     crawlers that do NOT execute JavaScript still see correct SEO signals.
 *
 * ANY new indexable page must be registered here.
 */

import { products } from "./products";
import { productDetails } from "./product-details";
import { articles } from "./articles";

export interface StaticRouteMeta {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  priority?: number;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
}

/** Non-dynamic top-level pages. */
export const staticRoutes: StaticRouteMeta[] = [
  {
    path: "/",
    title: "Enterprise FX Broker Infrastructure & Platform Solutions",
    description:
      "Enterprise-grade platform tools, migration services, and risk management for FX brokers. MT4/MT5 installation, server maintenance, CRM integration, copy trading, PAMM/MAMM and real-time risk monitoring.",
    keywords: [
      "FX broker infrastructure",
      "MT4 MT5 setup",
      "MetaTrader plugin development",
      "broker migration",
      "copy trading software for brokers",
      "PAMM MAMM plugin",
      "broker risk management",
    ],
    priority: 1.0,
    changefreq: "weekly",
  },
  {
    path: "/products",
    title: "MetaTrader Solutions & FX Broker Products",
    description:
      "Browse the full catalogue of brokerQ.io products: MT4/MT5 installation, migration tools, copy trading, PAMM/MAMM plugins, risk management, CRM integration, client portal, crypto gateway and more.",
    keywords: [
      "MetaTrader products",
      "MT4 MT5 plugins",
      "FX broker software",
      "copy trading plugin",
      "broker CRM",
    ],
    priority: 0.9,
    changefreq: "weekly",
  },
  {
    path: "/services/metatrader-plugins",
    title: "MetaTrader Plugin Development — MT4 & MT5 Custom Plugins for Brokers",
    description:
      "Custom MetaTrader 4 and MetaTrader 5 plugin development for FX brokers: copy trading, PAMM/MAMM, risk management, holiday & swap control, crypto gateway and bespoke manager API extensions.",
    keywords: [
      "MetaTrader plugin",
      "MT4 plugin development",
      "MT5 plugin development",
      "custom MetaTrader plugin",
      "MT5 manager API plugin",
      "MetaTrader gateway development",
    ],
    priority: 0.95,
    changefreq: "monthly",
  },
  {
    path: "/demos",
    title: "Live Demos — Try Our Broker Tools Online",
    description:
      "Explore live demos of brokerQ.io products: broker reporting, real-time risk monitoring, copy trading, prop firm management and crypto payment gateway. Log in instantly with demo credentials.",
    keywords: [
      "FX broker software demo",
      "risk monitoring demo",
      "copy trading demo",
      "prop firm software demo",
      "crypto payment gateway demo",
    ],
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/insights",
    title: "Insights — Broker Technology Guides & Analysis",
    description:
      "Practical guides and analysis for FX broker operators: MetaTrader migration, risk management, copy trading, PAMM/MAMM, grey/white label and broker infrastructure.",
    keywords: [
      "FX broker guides",
      "MetaTrader migration guide",
      "broker technology blog",
      "MT4 MT5 insights",
    ],
    priority: 0.8,
    changefreq: "weekly",
  },
  {
    path: "/about",
    title: "About brokerQ.io — 12+ Years of FX Broker Technology",
    description:
      "Meet the team behind brokerQ.io. Practitioners with 12+ years building and scaling MetaTrader-based FX broker infrastructure for regulated brokerages worldwide.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/contact",
    title: "Contact brokerQ.io — Request a Demo or Consultation",
    description:
      "Talk to our team about MT4/MT5 platform installation, broker migration, copy trading, PAMM/MAMM, risk management or custom MetaTrader plugin development. Response within one business day.",
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/faq",
    title: "FAQ — MetaTrader Migration, Plugins & Broker Infrastructure",
    description:
      "Answers to the most common questions about MT4/MT5 platform installation, migration, copy trading, PAMM/MAMM plugins, risk monitoring, CRM integration and managed broker infrastructure.",
    priority: 0.7,
    changefreq: "monthly",
  },
];

/** All product routes derived from data. */
export function getProductRoutes(): StaticRouteMeta[] {
  return products.map((p) => {
    const detail = productDetails[p.id];
    const keywords = detail?.seoKeywords ?? [p.title, "MetaTrader", "FX broker"];
    const description =
      detail?.metaDescription ??
      (detail?.subtitle ?? p.description).slice(0, 160);
    return {
      path: `/products/${p.id}`,
      title: detail?.seoTitle ?? detail?.headline ?? p.title,
      description,
      keywords,
      priority: 0.8,
      changefreq: "monthly" as const,
    };
  });
}

/** All article routes derived from data. */
export function getArticleRoutes(): StaticRouteMeta[] {
  return articles.map((a) => ({
    path: `/insights/${a.slug}`,
    title: a.seoTitle,
    description: a.metaDescription,
    keywords: a.seoKeywords,
    priority: 0.75,
    changefreq: "monthly" as const,
  }));
}

/** Every route that should appear in sitemap.xml / be prerendered. */
export function getAllRoutes(): StaticRouteMeta[] {
  return [...staticRoutes, ...getProductRoutes(), ...getArticleRoutes()];
}
