/**
 * Single source of truth for FAQ content.
 * Imported by the FAQ page (runtime) and the build-time SEO generator
 * (scripts/build-seo.mjs) to emit FAQPage JSON-LD for crawlers and AI systems.
 */
export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
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
