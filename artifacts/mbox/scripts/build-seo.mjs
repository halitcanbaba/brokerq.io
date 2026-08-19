#!/usr/bin/env node
/**
 * brokerQ.io — build-time SEO generator.
 *
 * Runs AFTER `vite build`. It reads the freshly built `dist/public/index.html`
 * and for every indexable route produces:
 *
 *   1. `dist/public/<route>/index.html`
 *      A standalone HTML file whose <head> already contains route-specific
 *      <title>, <meta description>, <meta keywords>, <link rel=canonical>,
 *      Open Graph & Twitter tags AND JSON-LD structured data. This means
 *      crawlers that do NOT execute JavaScript (Google fallback, Bing,
 *      Yandex, LinkedIn, Twitter/Discord preview bots, etc.) still see
 *      correct SEO signals on the initial response.
 *
 *   2. `dist/public/sitemap.xml`
 *      Fully regenerated from `src/data/products.ts` + `src/data/routes.ts`
 *      so new products automatically appear.
 *
 *   3. `dist/public/robots.txt` is left untouched; generator only asserts
 *      the sitemap URL is referenced (warns if not).
 *
 * Why not a framework like Next.js? The existing app is a pure Vite SPA and
 * the content tree is tiny (~20 routes). A deterministic post-build step is
 * faster, cheaper to debug, and doesn't require a Node runtime to serve.
 *
 * Nginx is already configured with `try_files $uri $uri/ /index.html;` so it
 * will serve the per-route `index.html` when present and fall back to the
 * SPA shell otherwise.
 */

import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MBOX_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(MBOX_ROOT, "dist", "public");
const INDEX_HTML = path.join(DIST_DIR, "index.html");

const BASE_URL = "https://brokerq.io";
const SITE_NAME = "brokerQ.io";
const DEFAULT_IMAGE = `${BASE_URL}/opengraph.jpg`;

// -----------------------------------------------------------------------------
// Load route + product metadata from the TS source via dynamic import.
// We import the compiled JS would be ideal, but the cheapest path on all OSes
// is to re-parse the TypeScript files as plain strings. Since they are simple
// data files with no runtime logic, we use `tsx` to execute them.
// -----------------------------------------------------------------------------

async function loadRoutes() {
  // Executed via `tsx` CLI which handles .ts imports natively.
  const routesUrl = new URL("../src/data/routes.ts", import.meta.url).href;
  const mod = await import(routesUrl);
  return mod.getAllRoutes();
}

// -----------------------------------------------------------------------------
// JSON-LD per route type.
// -----------------------------------------------------------------------------

function landingJsonLd(products = []) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      alternateName: "brokerQ",
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.svg`,
      image: DEFAULT_IMAGE,
      slogan: "Enterprise MetaTrader infrastructure for FX brokers",
      description:
        "Enterprise-grade MetaTrader (MT4/MT5) platform tools, plugin development, migration services, copy trading, PAMM/MAMM, prop-firm tooling, risk management, CRM integration, crypto payment gateway and grey/white-label solutions for FX brokers worldwide.",
      foundingDate: "2014",
      areaServed: "Worldwide",
      email: "sales@brokerq.io",
      telephone: "+44 7537 121984",
      knowsAbout: [
        "FX Broker Infrastructure",
        "MetaTrader 4",
        "MetaTrader 5",
        "MetaTrader Plugin Development",
        "MT4 to MT5 Migration",
        "Copy Trading",
        "PAMM MAMM",
        "Prop Firm Technology",
        "Risk Management Systems",
        "CRM Integration",
        "Crypto Payment Gateway",
        "Grey Label Brokerage",
        "White-label Broker Solutions",
      ],
      contactPoint: [
        { "@type": "ContactPoint", email: "sales@brokerq.io", telephone: "+44 7537 121984", contactType: "sales", availableLanguage: ["English"] },
        { "@type": "ContactPoint", email: "support@brokerq.io", contactType: "technical support", availableLanguage: ["English"] },
      ],
      ...(products.length
        ? {
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${SITE_NAME} Products & Services`,
              itemListElement: products.map((p) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: p.title,
                  url: `${BASE_URL}/products/${p.id}`,
                },
              })),
            },
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: BASE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/products?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

async function productJsonLd(productRoute, productsById, detailsById) {
  const id = productRoute.path.replace("/products/", "");
  const product = productsById.get(id);
  const detail = detailsById.get(id);
  if (!product || !detail) return [];

  const canonical = `${BASE_URL}${productRoute.path}`;
  const schemaType = detail.schemaType ?? "SoftwareApplication";

  const productSchema =
    schemaType === "Service"
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: detail.headline,
          serviceType: product.category,
          description: detail.subtitle,
          provider: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
          areaServed: "Worldwide",
          url: canonical,
        }
      : {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: detail.headline,
          applicationCategory: "BusinessApplication",
          operatingSystem: (detail.platforms ?? ["MetaTrader 4", "MetaTrader 5"]).join(", "),
          description: detail.subtitle,
          url: canonical,
          brand: { "@type": "Brand", name: SITE_NAME },
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
        };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${BASE_URL}/products` },
      { "@type": "ListItem", position: 3, name: detail.headline, item: canonical },
    ],
  };

  const schemas = [productSchema, breadcrumbSchema];
  if (detail.faqs?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: detail.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }
  return schemas;
}

function articleJsonLd(article) {
  const canonical = `${BASE_URL}/insights/${article.slug}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      author: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.svg` },
      },
      mainEntityOfPage: canonical,
      image: DEFAULT_IMAGE,
      articleSection: article.category,
      keywords: article.seoKeywords.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Insights", item: `${BASE_URL}/insights` },
        { "@type": "ListItem", position: 3, name: article.title, item: canonical },
      ],
    },
  ];
  if (article.faqs?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }
  return schemas;
}

function insightsJsonLd(articles) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${SITE_NAME} Insights`,
      itemListElement: articles.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/insights/${a.slug}`,
        name: a.title,
      })),
    },
  ];
}

function faqJsonLd(faqs) {
  if (!faqs?.length) return [];
  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];
}

function demosJsonLd(demoProjects) {
  const canonical = `${BASE_URL}/demos`;
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} Live Product Demos`,
    itemListElement: demoProjects.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: d.title,
      url: d.url ?? (d.productId ? `${BASE_URL}/products/${d.productId}` : canonical),
    })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Live Demos", item: canonical },
    ],
  };
  return [itemList, breadcrumb];
}

function pluginHubJsonLd() {
  const canonical = `${BASE_URL}/services/metatrader-plugins`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "MetaTrader Plugin Development",
      serviceType: "Custom MT4 & MT5 plugin development for FX brokers",
      description:
        "Custom MetaTrader 4 and MetaTrader 5 plugin development: copy trading, PAMM/MAMM, risk management, holiday & swap control, crypto gateway and bespoke manager API plugins.",
      provider: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
      areaServed: "Worldwide",
      url: canonical,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: canonical },
        { "@type": "ListItem", position: 3, name: "MetaTrader Plugins", item: canonical },
      ],
    },
  ];
}

async function jsonLdForRoute(route, ctx) {
  if (route.path === "/") return landingJsonLd(ctx.products);
  if (route.path === "/demos") return demosJsonLd(ctx.demoProjects);
  if (route.path === "/insights") return insightsJsonLd(ctx.articles);
  if (route.path.startsWith("/insights/")) {
    const slug = route.path.replace("/insights/", "");
    const article = ctx.articles.find((a) => a.slug === slug);
    return article ? articleJsonLd(article) : [];
  }
  if (route.path === "/faq") return faqJsonLd(ctx.faqs);
  if (route.path === "/services/metatrader-plugins") return pluginHubJsonLd();
  if (route.path.startsWith("/products/")) {
    return productJsonLd(route, ctx.productsById, ctx.detailsById);
  }
  return [];
}

// -----------------------------------------------------------------------------
// HTML transformation.
// -----------------------------------------------------------------------------

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderSeoBlock(route, jsonLd) {
  const canonical = `${BASE_URL}${route.path === "/" ? "/" : route.path.replace(/\/$/, "")}`;
  const fullTitle = `${route.title} | ${SITE_NAME}`;
  const description = route.description;
  const keywords = route.keywords?.join(", ");
  const ogType = route.path.startsWith("/products/") ? "product" : "website";

  const metaParts = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    keywords ? `<meta name="keywords" content="${escapeHtml(keywords)}" />` : "",
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${DEFAULT_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${DEFAULT_IMAGE}" />`,
  ];

  const jsonLdParts = jsonLd.map(
    (schema) =>
      `<script type="application/ld+json" data-static-seo="1">${JSON.stringify(schema)}</script>`
  );

  return [...metaParts.filter(Boolean), ...jsonLdParts].join("\n    ");
}

/**
 * Replace the marker block AND the default SEO tags in the head with the
 * route-specific ones. We strip defaults so Google does not see duplicated
 * title/description/canonical/OG tags.
 */
function injectSeoIntoHtml(baseHtml, route, jsonLd) {
  const seoBlock = renderSeoBlock(route, jsonLd);

  // Strip default <title>, <meta name=description|keywords|robots>, canonical,
  // og:*, twitter:*, og:image:alt from the head so we can replace cleanly.
  const STRIP_RE = [
    /<title>[\s\S]*?<\/title>\n?/,
    /<meta\s+name="description"[^>]*>\n?/g,
    /<meta\s+name="keywords"[^>]*>\n?/g,
    /<link\s+rel="canonical"[^>]*>\n?/g,
    /<meta\s+property="og:[^"]+"[^>]*>\n?/g,
    /<meta\s+name="twitter:[^"]+"[^>]*>\n?/g,
  ];

  let html = baseHtml;
  for (const re of STRIP_RE) html = html.replace(re, "");

  // Inject between markers.
  const MARKER_RE = /<!--SEO_INJECT_START-->[\s\S]*?<!--SEO_INJECT_END-->/;
  if (!MARKER_RE.test(html)) {
    throw new Error(
      "build-seo: SEO_INJECT markers not found in index.html. Did you remove them?"
    );
  }
  html = html.replace(
    MARKER_RE,
    `<!--SEO_INJECT_START-->\n    ${seoBlock}\n    <!--SEO_INJECT_END-->`
  );

  return html;
}

// -----------------------------------------------------------------------------
// Sitemap generation.
// -----------------------------------------------------------------------------

function buildSitemap(routes, lastmod) {
  const urls = routes
    .map((r) => {
      const loc = `${BASE_URL}${r.path === "/" ? "/" : r.path.replace(/\/$/, "")}`;
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        r.changefreq ? `    <changefreq>${r.changefreq}</changefreq>` : "",
        r.priority != null ? `    <priority>${r.priority.toFixed(1)}</priority>` : "",
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

// -----------------------------------------------------------------------------
// llms.txt — curated, LLM-friendly index of the site (see https://llmstxt.org).
// AI search engines and assistants (ChatGPT, Perplexity, Claude, Gemini, etc.)
// use this to understand and cite the site accurately.
// -----------------------------------------------------------------------------

function buildLlmsTxt(products, detailsById, articles = []) {
  const L = [];
  L.push(`# ${SITE_NAME}`);
  L.push("");
  L.push(
    "> Enterprise MetaTrader (MT4/MT5) infrastructure, plugins and services for FX brokers: platform installation, zero-downtime MT4→MT5 migration, real-time risk management, copy trading, PAMM/MAMM, prop-firm tooling, CRM integration, crypto payment gateway, grey/white-label solutions and licensing consulting."
  );
  L.push("");
  L.push(
    "brokerQ.io is a technology provider for regulated FX brokerages. Founded in 2014, the team builds and operates the trading infrastructure brokers run on — helping them launch, migrate between MetaTrader servers, monitor risk in real time, and automate operations. Every product is purpose-built for MetaTrader 4 and MetaTrader 5 environments and is used by brokers worldwide."
  );
  L.push("");
  L.push("## Products & Services");
  L.push("");
  for (const p of products) {
    const d = detailsById.get(p.id);
    const desc = (d?.subtitle ?? p.description).replace(/\s+/g, " ").trim();
    L.push(`- [${p.title}](${BASE_URL}/products/${p.id}): ${desc}`);
  }
  L.push("");
  if (articles.length) {
    L.push("## Insights & Guides");
    L.push("");
    for (const a of articles) {
      L.push(`- [${a.title}](${BASE_URL}/insights/${a.slug}): ${a.excerpt.replace(/\s+/g, " ").trim()}`);
    }
    L.push("");
  }
  L.push("## Key Pages");
  L.push("");
  L.push(`- [Live Demos](${BASE_URL}/demos): Try the tools online — broker reporting, real-time risk monitor, copy trading, prop-firm management, MT5→MT5 migrator and crypto payment gateway. Self-serve demos use username \`demo\` / password \`demo123456\`.`);
  L.push(`- [MetaTrader Plugin Development](${BASE_URL}/services/metatrader-plugins): Custom MT4/MT5 plugin development for FX brokers.`);
  L.push(`- [FAQ](${BASE_URL}/faq): Answers on platform installation, MT4→MT5 migration, risk management, CRM integration and infrastructure.`);
  L.push(`- [About](${BASE_URL}/about): 12+ years building FX broker technology.`);
  L.push(`- [Contact](${BASE_URL}/contact): Request a demo or consultation.`);
  L.push("");
  L.push("## Contact");
  L.push("");
  L.push("- Sales: sales@brokerq.io");
  L.push("- Support: support@brokerq.io");
  L.push("- Phone: +44 7537 121984 (Mon–Fri, 08:00–20:00 GMT)");
  L.push("");
  return L.join("\n");
}

// -----------------------------------------------------------------------------
// robots.txt — welcome all crawlers, including AI/LLM crawlers, and point to
// both the sitemap and llms.txt.
// -----------------------------------------------------------------------------

function buildRobotsTxt() {
  const aiBots = [
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "Amazonbot",
    "Bytespider",
    "Meta-ExternalAgent",
    "cohere-ai",
  ];
  const lines = [
    "# brokerQ.io — all crawlers welcome, including AI / LLM crawlers.",
    "User-agent: *",
    "Allow: /",
    "",
    "# Explicitly welcome AI search & assistant crawlers.",
  ];
  for (const b of aiBots) {
    lines.push(`User-agent: ${b}`);
    lines.push("Allow: /");
  }
  lines.push("");
  lines.push(`Sitemap: ${BASE_URL}/sitemap.xml`);
  lines.push("");
  return lines.join("\n");
}

// -----------------------------------------------------------------------------
// Main.
// -----------------------------------------------------------------------------

async function main() {
  // Sanity check
  try {
    await stat(INDEX_HTML);
  } catch {
    console.error(`[build-seo] ${INDEX_HTML} not found. Run \`vite build\` first.`);
    process.exit(1);
  }

  console.log("[build-seo] Loading route metadata from TS sources...");
  const routes = await loadRoutes();

  // Load raw products + details to compose product JSON-LD.
  const productsMod = await import(
    new URL("../src/data/products.ts", import.meta.url).href
  );
  const detailsMod = await import(
    new URL("../src/data/product-details.ts", import.meta.url).href
  );
  const productsById = new Map(productsMod.products.map((p) => [p.id, p]));
  const detailsById = new Map(Object.entries(detailsMod.productDetails));

  const demosMod = await import(
    new URL("../src/data/demos.ts", import.meta.url).href
  );
  const demoProjects = demosMod.demoProjects;

  const faqsMod = await import(
    new URL("../src/data/faqs.ts", import.meta.url).href
  );
  const faqs = faqsMod.faqs;
  const products = productsMod.products;

  const articlesMod = await import(
    new URL("../src/data/articles.ts", import.meta.url).href
  );
  const articles = articlesMod.articles;

  const baseHtml = await readFile(INDEX_HTML, "utf-8");
  const lastmod = new Date().toISOString().slice(0, 10);

  // 1. Per-route HTML files.
  let generated = 0;
  for (const route of routes) {
    const jsonLd = await jsonLdForRoute(route, { productsById, detailsById, demoProjects, faqs, products, articles });
    const html = injectSeoIntoHtml(baseHtml, route, jsonLd);

    if (route.path === "/") {
      // Overwrite the root index.html with the landing-page SEO block.
      await writeFile(INDEX_HTML, html, "utf-8");
    } else {
      const routeDir = path.join(DIST_DIR, ...route.path.split("/").filter(Boolean));
      await mkdir(routeDir, { recursive: true });
      await writeFile(path.join(routeDir, "index.html"), html, "utf-8");
    }
    generated++;
  }
  console.log(`[build-seo] Generated ${generated} per-route HTML files.`);

  // 2. Sitemap.
  const sitemap = buildSitemap(routes, lastmod);
  await writeFile(path.join(DIST_DIR, "sitemap.xml"), sitemap, "utf-8");
  console.log(`[build-seo] Wrote sitemap.xml with ${routes.length} URLs.`);

  // 2b. llms.txt — LLM-friendly site index for AI search engines & assistants.
  const llms = buildLlmsTxt(products, detailsById, articles);
  await writeFile(path.join(DIST_DIR, "llms.txt"), llms, "utf-8");
  console.log("[build-seo] Wrote llms.txt.");

  // 2c. robots.txt — welcome all crawlers incl. AI/LLM bots + sitemap.
  await writeFile(path.join(DIST_DIR, "robots.txt"), buildRobotsTxt(), "utf-8");
  console.log("[build-seo] Wrote robots.txt (AI crawlers welcomed).");

  // 3. robots.txt sanity.
  try {
    const robotsPath = path.join(DIST_DIR, "robots.txt");
    const robots = await readFile(robotsPath, "utf-8");
    if (!/Sitemap:\s*https?:\/\//i.test(robots)) {
      console.warn(
        "[build-seo] WARN: robots.txt does not reference a Sitemap URL. " +
          "Consider adding: Sitemap: " + BASE_URL + "/sitemap.xml"
      );
    }
  } catch {
    // robots.txt is optional at build time.
  }

  console.log("[build-seo] Done.");
}

main().catch((err) => {
  console.error("[build-seo] FAILED:", err);
  process.exit(1);
});
