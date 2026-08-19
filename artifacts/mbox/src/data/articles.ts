/**
 * Long-form editorial / guide content ("Insights") for SEO and AI discoverability.
 *
 * Imported by:
 *   - InsightsPage (index) and ArticlePage (runtime rendering)
 *   - scripts/build-seo.mjs (Article + FAQ JSON-LD, sitemap, llms.txt)
 *
 * Any new article registered here automatically gets a prerendered page,
 * sitemap entry, structured data and an llms.txt line.
 */

export interface ArticleSection {
  /** Optional H2 heading for the section. */
  heading?: string;
  /** Body paragraphs. */
  paragraphs?: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
}

export interface Article {
  slug: string;
  title: string;
  /** Short summary shown on the index card and used as fallback meta description. */
  excerpt: string;
  category: string;
  readMinutes: number;
  /** ISO date (YYYY-MM-DD). */
  datePublished: string;
  dateModified: string;
  /** SEO <title> without site suffix. */
  seoTitle: string;
  metaDescription: string;
  seoKeywords: string[];
  /** Sub-headline under the article title. */
  heroSubtitle: string;
  sections: ArticleSection[];
  faqs: { question: string; answer: string }[];
  /** Related product for an internal-link CTA. */
  relatedProductId?: string;
}

export const articles: Article[] = [
  {
    slug: "mt4-to-mt5-migration-guide",
    title: "MT4 to MT5 Migration: The Complete Guide for FX Brokers",
    excerpt:
      "A practical, broker-focused playbook for migrating from MetaTrader 4 to MetaTrader 5 — what actually moves, how to avoid downtime and slippage, and how to plan a safe cut-over.",
    category: "Migration",
    readMinutes: 9,
    datePublished: "2026-08-20",
    dateModified: "2026-08-20",
    seoTitle: "MT4 to MT5 Migration Guide for Brokers — Zero-Downtime Cut-Over",
    metaDescription:
      "How FX brokers migrate from MT4 to MT5 without trading downtime: what data moves, how open positions and history are preserved, staged cut-over, rollback safety and a realistic timeline.",
    seoKeywords: [
      "MT4 to MT5 migration",
      "MetaTrader 4 to MetaTrader 5 migration",
      "broker platform migration",
      "MT5 migration guide",
      "zero downtime broker migration",
      "MT4 MT5 account transfer",
      "migrate forex broker to MT5",
    ],
    heroSubtitle:
      "Everything a brokerage needs to plan an MT4-to-MT5 move: scope, sequencing, the cut-over window, and the risks worth engineering around.",
    sections: [
      {
        paragraphs: [
          "MetaTrader 5 is now the default platform for new FX and multi-asset brokerages, and MetaQuotes has steadily narrowed the reasons to stay on MetaTrader 4. Yet migration is where most brokers hesitate — not because MT5 is unproven, but because moving a live book of clients, balances, open positions and years of trading history feels risky. It does not have to be. Done properly, an MT4-to-MT5 migration is a staged, reversible engineering project with a cut-over measured in seconds, not days.",
          "This guide walks through what actually happens in a broker migration: what moves, what breaks if you are careless, and how to sequence the work so clients barely notice.",
        ],
      },
      {
        heading: "Why brokers move from MT4 to MT5",
        paragraphs: [
          "MT5 is not simply a newer MT4. It is a different server architecture with native support for more asset classes, an economic calendar, more order types, netting and hedging accounting modes, and a far more capable Manager and Gateway API. For a growing brokerage the practical drivers are usually a mix of the following:",
        ],
        bullets: [
          "Multi-asset expansion — equities, futures and more alongside FX and CFDs.",
          "A richer plugin and gateway ecosystem, including modern risk, copy-trading and PAMM/MAMM tooling.",
          "Better reporting and Manager API access for automation.",
          "Vendor direction — new features and integrations increasingly target MT5 first.",
        ],
      },
      {
        heading: "What actually gets migrated",
        paragraphs: [
          "The single biggest source of migration anxiety is data loss. A complete migration moves far more than account logins. At minimum you should expect all of the following to transfer, reconciled and verified:",
        ],
        bullets: [
          "Client accounts, balances, leverage settings and group configuration.",
          "Full closed-trade history, deal records and equity curves.",
          "Open positions, transferred with a price-lock so floating P&L and entry prices are preserved exactly.",
          "Manager and administrator permissions, and where applicable custom plugin settings.",
        ],
      },
      {
        heading: "The zero-downtime cut-over, explained",
        paragraphs: [
          "\"Zero downtime\" does not mean magic — it means sequencing. The migration runs in two phases. In the preparation phase your MT4 environment stays fully live and trading while accounts, groups and closed history are pre-migrated and reconciled against the source. Nothing client-facing changes during this phase, which typically takes the majority of the project time.",
          "The cut-over itself is a short maintenance window. Open positions are carried across with a price-lock mechanism that eliminates slippage, final balances are reconciled, and clients are routed to MT5. A well-run cut-over keeps trading interruption under sixty seconds. Because a full pre-migration snapshot is retained, the whole operation is reversible: if the automated reconciliation flags a discrepancy, you roll back with no data loss.",
        ],
      },
      {
        heading: "Risks worth engineering around",
        paragraphs: [
          "Most migration horror stories trace back to a handful of avoidable mistakes. Plan for these explicitly:",
        ],
        bullets: [
          "Symbol and group mapping — MT4 and MT5 symbol naming and group logic differ; map them deliberately, not by guesswork.",
          "Open-position slippage — never migrate live positions without a price-lock cut-over.",
          "History integrity — signal providers, PAMM/MAMM accounts and regulated reporting all depend on complete deal history surviving the move.",
          "Rollback — if there is no snapshot and no tested rollback path, you do not have a safe migration.",
        ],
      },
      {
        heading: "A realistic timeline",
        paragraphs: [
          "For a typical single-server broker, end-to-end migration runs about two to four weeks. Requirements gathering and symbol mapping take three to five days. Dry-run migrations and reconciliation take one to two weeks — this is where the real work is, and where corners must not be cut. The production cut-over is a single maintenance window of under a minute of trading downtime, followed by a rollback window (commonly 30 days) during which the pre-migration snapshot is retained.",
          "Multi-server consolidations, or migrations with heavy custom plugin logic, sit at the longer end of that range. The variable is never the cut-over — it is the reconciliation.",
        ],
      },
      {
        heading: "How brokerQ.io approaches it",
        paragraphs: [
          "Our MT4-to-MT5 migration tool is purpose-built rather than a generic data bridge: staged pre-migration while MT4 stays live, a sub-minute price-locked cut-over, automated reconciliation at every step, and a retained rollback snapshot. More than 50 brokers have moved their full book this way with no client complaints about lost history or pricing anomalies. If you are weighing a move, the fastest way to de-risk it is a scoped dry run against a copy of your book.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I migrate from MT4 to MT5 without any trading downtime?",
        answer:
          "Effectively yes. Accounts and history are pre-migrated while MT4 stays live, and open positions are transferred during a brief cut-over window using a price-lock that eliminates slippage. Total client-facing interruption is typically under 60 seconds.",
      },
      {
        question: "Do open positions and floating P&L survive the migration?",
        answer:
          "Yes. Open positions are carried across with a price-lock mechanism so entry prices, floating P&L and swaps are preserved exactly. Clients see their positions continue seamlessly on MT5.",
      },
      {
        question: "Is the full MT4 trade history preserved?",
        answer:
          "Yes. Every closed order, deal record, balance operation and equity curve is migrated so clients keep their complete track record — essential for copy-trading signal providers, PAMM/MAMM accounts and regulated reporting.",
      },
      {
        question: "What happens if something goes wrong during the cut-over?",
        answer:
          "A full pre-migration snapshot is taken before cut-over. If the automated reconciliation engine flags any discrepancy, you can roll back to MT4 with no data loss. Rollback is commonly supported for 30 days after go-live.",
      },
      {
        question: "How long does an MT4 to MT5 migration take?",
        answer:
          "For a typical single-server broker, two to four weeks end to end. Symbol mapping takes 3–5 days, dry runs and reconciliation take 1–2 weeks, and the production cut-over is a single maintenance window of under 60 seconds of trading downtime.",
      },
    ],
    relatedProductId: "mt5-migration-tool",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
