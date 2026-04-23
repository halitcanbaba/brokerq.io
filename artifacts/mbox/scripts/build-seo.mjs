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

function landingJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.svg`,
      description:
        "Enterprise-grade platform tools, migration services, and risk management for FX brokers worldwide.",
      foundingDate: "2014",
      areaServed: "Worldwide",
      knowsAbout: [
        "FX Broker Infrastructure",
        "MetaTrader 4",
        "MetaTrader 5",
        "MetaTrader Plugin Development",
        "MT4 to MT5 Migration",
        "Copy Trading",
        "PAMM MAMM",
        "Risk Management Systems",
        "CRM Integration",
        "White-label Broker Solutions",
      ],
      contactPoint: [
        { "@type": "ContactPoint", email: "sales@brokerq.io", contactType: "sales", availableLanguage: ["English"] },
        { "@type": "ContactPoint", email: "support@brokerq.io", contactType: "technical support", availableLanguage: ["English"] },
      ],
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
  if (route.path === "/") return landingJsonLd();
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

  const baseHtml = await readFile(INDEX_HTML, "utf-8");
  const lastmod = new Date().toISOString().slice(0, 10);

  // 1. Per-route HTML files.
  let generated = 0;
  for (const route of routes) {
    const jsonLd = await jsonLdForRoute(route, { productsById, detailsById });
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
