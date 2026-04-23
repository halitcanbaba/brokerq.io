import { useEffect } from "react";
import { useLocation } from "wouter";

const BASE_URL = "https://brokerq.io";
const SITE_NAME = "brokerQ.io";
const DEFAULT_IMAGE = `${BASE_URL}/opengraph.jpg`;

export interface SeoProps {
  /** Page title (without site name suffix). Will be rendered as `${title} | brokerQ.io`. */
  title: string;
  /** Meta description (150–160 chars recommended). */
  description: string;
  /** Optional keyword list for meta keywords (legacy, but still useful for Bing/Yandex). */
  keywords?: string[];
  /** Absolute canonical URL override. Defaults to current path under BASE_URL. */
  canonical?: string;
  /** Open Graph image URL. Defaults to site-wide OG image. */
  image?: string;
  /** Open Graph type. Defaults to `website`. */
  ogType?: "website" | "article" | "product" | "profile";
  /** Article publish date (for article type). */
  publishedTime?: string;
  /** Article modified date. */
  modifiedTime?: string;
  /** Structured data schemas to emit as JSON-LD. */
  jsonLd?: Array<Record<string, unknown>>;
  /** Set to true to prevent indexing (used on 404, admin pages). */
  noIndex?: boolean;
}

/**
 * Declarative SEO head component powered by React 19 native metadata hoisting.
 * Tags rendered here are automatically hoisted to `<head>`.
 *
 * During static HTML generation (`scripts/build-seo.mjs`) the same metadata is
 * injected into per-route index.html files so that crawlers see correct
 * title/description/canonical/OG/JSON-LD in the initial response.
 */
export default function Seo(props: SeoProps) {
  // Remove statically-injected JSON-LD scripts (added by build-seo.mjs) so
  // React's version is the single source of truth and Google doesn't see duplicates.
  useEffect(() => {
    document
      .querySelectorAll('script[type="application/ld+json"][data-static-seo]')
      .forEach((el) => el.remove());
  }, []);

  const {
    title,
    description,
    keywords,
    canonical,
    image = DEFAULT_IMAGE,
    ogType = "website",
    publishedTime,
    modifiedTime,
    jsonLd,
    noIndex = false,
  } = props;

  const [location] = useLocation();
  const path = typeof window === "undefined" ? location : window.location.pathname;
  const canonicalUrl = canonical ?? `${BASE_URL}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <link rel="canonical" href={canonicalUrl} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured data */}
      {jsonLd?.map((schema, i) => (
        <script
          key={`jsonld-${i}`}
          type="application/ld+json"
          // React 19 supports inlining JSON via dangerouslySetInnerHTML
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

/** Build canonical URL for a given path (used by static HTML generator & page schemas). */
export function canonicalFor(path: string): string {
  return `${BASE_URL}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
}

export const SITE = {
  baseUrl: BASE_URL,
  siteName: SITE_NAME,
  defaultImage: DEFAULT_IMAGE,
} as const;
