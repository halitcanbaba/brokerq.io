export interface ProductFaq {
  question: string;
  answer: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDetail {
  headline: string;
  subtitle: string;
  features: { title: string; description: string; icon: string }[];
  benefits: string[];
  useCases: string[];
  /** SEO-optimised <title> (without site suffix). Falls back to `headline`. */
  seoTitle?: string;
  /** Meta description 150–160 chars, keyword-rich. Falls back to `subtitle`. */
  metaDescription?: string;
  /** Comma-targeted SEO keyword list. */
  seoKeywords?: string[];
  /** Long-form, keyword-rich overview (rendered as prose section). 500–1200 chars recommended. */
  longDescription?: string;
  /** Product-specific FAQs (rendered on page + exposed as FAQPage JSON-LD). */
  faqs?: ProductFaq[];
  /** Quick-glance spec table. */
  specs?: ProductSpec[];
  /** Schema.org type for structured data. Defaults to `SoftwareApplication`. */
  schemaType?: "SoftwareApplication" | "Service" | "Product";
  /** Supported platforms (used in SoftwareApplication schema). */
  platforms?: string[];
}

export const productDetails: Record<string, ProductDetail> = {
  "mt-platform-installation": {
    headline: "MT5 & MT4 Platform Installation",
    subtitle:
      "End-to-end broker platform deployment — from server provisioning to production launch — with zero configuration headaches.",
    features: [
      {
        title: "Turnkey Server Setup",
        description:
          "Full trade server deployment including access server, manager API, gateway configuration, and network topology optimised for low-latency execution.",
        icon: "Server",
      },
      {
        title: "Plugin Configuration",
        description:
          "Installation and tuning of essential plugins: dealing desk, risk management, bridge connectors, and custom manager extensions.",
        icon: "Puzzle",
      },
      {
        title: "Security Hardening",
        description:
          "Firewall rules, SSL certificates, DDoS protection, and access control policies aligned with industry best practices.",
        icon: "ShieldCheck",
      },
      {
        title: "Performance Tuning",
        description:
          "Database optimisation, memory allocation tuning, and network stack configuration to maximise throughput and minimise latency.",
        icon: "Gauge",
      },
    ],
    benefits: [
      "Go live in days, not weeks",
      "Battle-tested configuration templates from 50+ deployments",
      "Full documentation and runbooks included",
      "Post-install monitoring setup at no extra cost",
    ],
    useCases: [
      "New brokers launching their first platform",
      "Established brokers adding MT5 alongside MT4",
      "Brokers migrating to dedicated infrastructure from shared hosting",
    ],
    seoTitle: "MT4 & MT5 Installation for Brokers — Platform Setup & Configuration",
    metaDescription:
      "Turnkey MetaTrader 4 and MetaTrader 5 installation for FX brokers: trade server deployment, plugin configuration, security hardening and performance tuning. Live in days, not weeks.",
    seoKeywords: [
      "MT4 installation",
      "MT5 installation",
      "MetaTrader server setup",
      "MT5 broker setup",
      "MetaTrader 5 configuration",
      "trade server deployment",
      "broker platform setup",
    ],
    schemaType: "Service",
    platforms: ["MetaTrader 4", "MetaTrader 5"],
    longDescription:
      "A production-ready MetaTrader deployment is more than running the MT4/MT5 installer on a server. brokerQ.io handles the full lifecycle: infrastructure sizing, trade server + access server + gateway provisioning, latency-optimised network topology, plugin installation, SSL hardening, DDoS protection, database tuning, monitoring and runbooks. Our configuration templates are derived from 50+ production deployments and are battle-tested for regulated brokerages.",
    specs: [
      { label: "Typical Timeline", value: "3–5 business days" },
      { label: "Platforms", value: "MT4, MT5, or hybrid" },
      { label: "Components", value: "Trade + Access + Gateway + Manager API" },
      { label: "Security", value: "Firewall, SSL, DDoS protection, access control" },
      { label: "Deliverables", value: "Runbooks, monitoring dashboards, documentation" },
    ],
    faqs: [
      {
        question: "What is the typical timeline for a full MT4 or MT5 installation?",
        answer:
          "A standard deployment runs 3–5 business days from kick-off to production launch. Multi-server setups with custom gateway configurations may take up to 10 business days.",
      },
      {
        question: "Do you install only the trade server, or the full stack?",
        answer:
          "We install the full MetaTrader stack: trade server, access server, manager API, gateway, and supporting infrastructure (monitoring, backup, alerting). You can also scope down to specific components if you already have parts of the stack in place.",
      },
      {
        question: "Can we bring our own plugins, or do you install only your own?",
        answer:
          "Both. We install and configure any third-party plugin you have licensed (bridges, risk tools, CRMs), and we can layer on brokerQ.io plugins (Copytrader, PAMM/MAMM, Risk Monitoring, Holiday & Swap Manager) as needed.",
      },
    ],
  },

  "server-maintenance": {
    headline: "Server Maintenance",
    subtitle:
      "Proactive, 24/7 infrastructure management that keeps your trading platform stable, secure, and performing at peak.",
    features: [
      {
        title: "24/7 Monitoring",
        description:
          "Real-time alerting on CPU, memory, disk, network, and application-layer metrics with automated incident escalation.",
        icon: "Activity",
      },
      {
        title: "Patch Management",
        description:
          "Scheduled OS and platform patching with rollback capability, applied during low-traffic windows to avoid disruption.",
        icon: "RefreshCcw",
      },
      {
        title: "Backup & Disaster Recovery",
        description:
          "Automated daily backups with point-in-time recovery, geo-redundant storage, and tested restore procedures.",
        icon: "DatabaseBackup",
      },
      {
        title: "Performance Reporting",
        description:
          "Monthly infrastructure health reports with capacity forecasts, latency trends, and actionable optimisation recommendations.",
        icon: "BarChart3",
      },
    ],
    benefits: [
      "99.9% uptime SLA backed by financial guarantees",
      "Dedicated infrastructure engineer assigned to your account",
      "Proactive capacity planning prevents outages before they happen",
      "Compliance-ready audit logs and change management",
    ],
    useCases: [
      "Brokers without an in-house DevOps team",
      "Regulated brokers needing documented change control",
      "High-volume operations requiring sub-second incident response",
    ],
  },

  "mt5-migration-tool": {
    headline: "MT5 Migration Tool",
    subtitle:
      "Seamlessly migrate client accounts, trading history, and open positions from MT4 to MT5 with zero downtime and full data integrity.",
    features: [
      {
        title: "Account Migration",
        description:
          "Bulk transfer of client accounts, balances, leverage settings, and group configurations with automated validation.",
        icon: "Users",
      },
      {
        title: "Trade History Preservation",
        description:
          "Complete migration of closed orders, deal history, and equity curves so clients retain their full trading track record.",
        icon: "History",
      },
      {
        title: "Open Position Transfer",
        description:
          "Live position migration with price-lock mechanism to prevent slippage during the cut-over window.",
        icon: "ArrowRightLeft",
      },
      {
        title: "Rollback Safety",
        description:
          "Full pre-migration snapshot with one-click rollback capability if any issues are detected post-migration.",
        icon: "Undo2",
      },
    ],
    benefits: [
      "Zero trading downtime during migration",
      "Automated data integrity checks at every stage",
      "Client-facing communication templates included",
      "Dedicated migration engineer on standby during cut-over",
    ],
    useCases: [
      "Brokers moving their client base from MT4 to MT5",
      "Multi-asset brokers needing MT5 netting and hedging support",
      "Brokers consolidating multiple MT4 servers into one MT5 instance",
    ],
    seoTitle: "MT4 to MT5 Migration Tool — Zero-Downtime Broker Migration",
    metaDescription:
      "Migrate from MetaTrader 4 to MetaTrader 5 without trading downtime. Transfer accounts, full trade history, and open positions with price-lock, rollback safety and zero data loss.",
    seoKeywords: [
      "MT4 to MT5 migration",
      "MetaTrader 4 to MT5 migration tool",
      "MT5 migration",
      "MetaTrader migration service",
      "broker platform migration",
      "MT5 server migration",
      "MT4 MT5 account transfer",
      "zero downtime broker migration",
    ],
    longDescription:
      "Our MT4 to MT5 migration tool is a purpose-built utility that moves every client account, balance, leverage setting, group configuration, closed trade, deal record and open position from your existing MetaTrader 4 server to a new MetaTrader 5 environment — without trading downtime and without slippage. Unlike generic data-bridge scripts, the brokerQ.io migration engine uses a staged pre-migration phase (while MT4 stays fully live) followed by a sub-minute price-locked cut-over. Every step is validated by an automated reconciliation engine, and a one-click rollback snapshot is retained for 30 days post-migration. More than 50 brokers have used this tool to migrate their full book from MT4 to MT5 with zero client complaints about history loss or pricing anomalies.",
    schemaType: "SoftwareApplication",
    platforms: ["MetaTrader 4", "MetaTrader 5"],
    specs: [
      { label: "Migration Type", value: "MT4 → MT5 full book" },
      { label: "Trading Downtime", value: "< 60 seconds" },
      { label: "Data Migrated", value: "Accounts, history, deals, open positions" },
      { label: "Rollback Window", value: "30 days post cut-over" },
      { label: "Supported MT4 Builds", value: "1220+" },
      { label: "Supported MT5 Builds", value: "3815+" },
      { label: "Typical Timeline", value: "2–4 weeks end-to-end" },
    ],
    faqs: [
      {
        question: "How long does an MT4 to MT5 migration take?",
        answer:
          "End-to-end project time is typically 2 to 4 weeks: requirements and symbol mapping take 3–5 days, dry-run migrations and reconciliation take 5–10 days, and the production cut-over itself runs in a single maintenance window of under 60 seconds of trading downtime.",
      },
      {
        question: "Do open positions survive the MT4 to MT5 migration?",
        answer:
          "Yes. Open positions are transferred during the cut-over window using a price-lock mechanism that eliminates slippage. Floating P&L, swaps, and entry prices are preserved exactly, and clients see their positions continue seamlessly on MT5.",
      },
      {
        question: "Is the full MT4 trade history preserved after migration?",
        answer:
          "Yes. Every closed order, deal record, balance operation and equity curve is migrated so clients retain their complete track record. This is critical for copy-trading signal providers, PAMM/MAMM accounts and any regulated reporting.",
      },
      {
        question: "What happens if something goes wrong mid-migration?",
        answer:
          "Before the cut-over we take a full pre-migration snapshot. If the automated reconciliation engine flags any discrepancy you can revert to MT4 with a single click and zero data loss. Rollback is supported for 30 days after go-live.",
      },
      {
        question: "Can we migrate only a subset of accounts or groups?",
        answer:
          "Absolutely. The tool supports selective migration by group, account range, or date window — useful for brokers who want to pilot MT5 with a specific client segment before moving the full book.",
      },
    ],
  },

  "mt4-migration-tool": {
    headline: "MT4 Migration Tool",
    subtitle:
      "Automated migration utilities to transfer data between MT4 server instances with zero downtime and complete audit trails.",
    features: [
      {
        title: "Server-to-Server Transfer",
        description:
          "Move client data between MT4 instances — whether consolidating servers, switching data centres, or splitting client groups.",
        icon: "ArrowLeftRight",
      },
      {
        title: "Selective Migration",
        description:
          "Granular control to migrate specific groups, accounts, or date ranges rather than forcing an all-or-nothing approach.",
        icon: "Filter",
      },
      {
        title: "Automated Validation",
        description:
          "Post-migration reconciliation engine compares source and destination data, flagging discrepancies before go-live.",
        icon: "CheckCircle2",
      },
      {
        title: "Scheduling & Automation",
        description:
          "Schedule migrations for off-peak hours with automated execution and completion notifications.",
        icon: "Clock",
      },
    ],
    benefits: [
      "Migrate thousands of accounts in minutes, not days",
      "Full audit trail for regulatory compliance",
      "Dry-run mode to preview changes before committing",
      "Compatible with all MT4 builds from 1220+",
    ],
    useCases: [
      "Brokers switching data centre providers",
      "White-label brokers splitting off to their own infrastructure",
      "Disaster recovery server provisioning",
    ],
    seoTitle: "MT4 Migration Tool — Server-to-Server Broker Data Transfer",
    metaDescription:
      "Automated MT4 server-to-server migration with selective account transfer, full audit trail and rollback safety. Move between data centres or white-labels with zero downtime.",
    seoKeywords: [
      "MT4 migration",
      "MT4 server migration",
      "MetaTrader 4 migration tool",
      "MT4 data centre migration",
      "MT4 white label migration",
      "MT4 account transfer tool",
    ],
    longDescription:
      "The brokerQ.io MT4 migration tool moves client data between MetaTrader 4 server instances — whether you are consolidating servers, switching data centres, separating a white-label from a master broker, or provisioning a disaster-recovery standby. You keep full control over what is moved: specific groups, account ranges, date windows or the entire book. Every migration is preceded by a dry-run and followed by an automated reconciliation pass so discrepancies surface before go-live.",
    schemaType: "SoftwareApplication",
    platforms: ["MetaTrader 4"],
    specs: [
      { label: "Migration Type", value: "MT4 → MT4 (server to server)" },
      { label: "Granularity", value: "Group, account range, date window" },
      { label: "Compatible Builds", value: "MT4 1220+" },
      { label: "Dry-run Mode", value: "Full preview with diff report" },
      { label: "Audit Trail", value: "Exportable CSV / PDF" },
    ],
    faqs: [
      {
        question: "When would I use the MT4 migration tool instead of the MT4→MT5 migration tool?",
        answer:
          "Use this tool when both source and destination are MetaTrader 4 — typically when switching hosting providers, separating a white-label, or consolidating multiple MT4 servers. For MT4 → MT5 platform upgrades use our MT5 Migration Tool.",
      },
      {
        question: "Can I split off a white-label brokerage to its own MT4 server?",
        answer:
          "Yes. Filter by the white-label's group(s), run a dry-run, then execute during an off-peak window. The tool migrates accounts, balances, trade history, open positions and commission structures with full audit logs.",
      },
      {
        question: "Does the migration tool require trading downtime?",
        answer:
          "Pre-migration and reconciliation happen in the background while MT4 stays live. The final cut-over window for moving open positions is typically under 60 seconds of client-visible downtime.",
      },
    ],
  },

  "risk-monitoring-system": {
    headline: "Risk Management",
    subtitle:
      "Comprehensive risk management suite — real-time exposure monitoring, hedging analytics, automated alerts, and P&L controls for complete dealing desk oversight.",
    features: [
      {
        title: "Live Exposure Dashboard",
        description:
          "Real-time aggregated view of net exposure by symbol, group, and individual client — updated every tick.",
        icon: "BarChart3",
      },
      {
        title: "Automated Alerts",
        description:
          "Configurable threshold alerts via email, SMS, and Telegram when exposure, margin, or P&L limits are breached.",
        icon: "Bell",
      },
      {
        title: "Client Risk Profiling",
        description:
          "Machine-learning-assisted client categorisation based on trading behaviour, win rate, and historical patterns.",
        icon: "UserCheck",
      },
      {
        title: "Hedging Analytics",
        description:
          "Optimal hedge ratio calculations and LP fill-rate analysis to minimise slippage and maximise B-book profitability.",
        icon: "TrendingUp",
      },
    ],
    benefits: [
      "Reduce unhedged exposure by up to 80%",
      "Sub-second alert delivery on critical thresholds",
      "Historical risk replay for compliance audits",
      "Integrates with all major liquidity providers",
    ],
    useCases: [
      "Dealing desks managing hybrid A/B-book models",
      "Compliance teams needing real-time risk oversight",
      "Brokers scaling beyond manual spreadsheet-based monitoring",
    ],
    seoTitle: "FX Broker Risk Management System — Real-Time Exposure Monitoring",
    metaDescription:
      "Real-time FX broker risk management: live exposure by symbol and group, A-book / B-book analytics, automated alerts and hedging recommendations for MT4 and MT5 dealing desks.",
    seoKeywords: [
      "FX broker risk management",
      "broker exposure monitoring",
      "MT4 MT5 risk management",
      "A-book B-book analytics",
      "dealing desk software",
      "real-time broker risk",
    ],
    schemaType: "SoftwareApplication",
    platforms: ["MetaTrader 4", "MetaTrader 5"],
  },

  "crm-integrated": {
    headline: "CRM Integration",
    subtitle:
      "Bi-directional CRM sync that connects client lifecycle management, KYC workflows, and trading account provisioning in one seamless flow.",
    features: [
      {
        title: "Auto Account Provisioning",
        description:
          "New CRM leads automatically get trading accounts created with the correct group, leverage, and currency settings.",
        icon: "UserPlus",
      },
      {
        title: "KYC Workflow Engine",
        description:
          "Document upload, ID verification integration, and approval workflows with audit trails for regulatory compliance.",
        icon: "FileCheck",
      },
      {
        title: "Bi-directional Sync",
        description:
          "Real-time data sync between CRM and trading platform — balance changes, deposit status, and trading activity reflected instantly.",
        icon: "RefreshCcw",
      },
      {
        title: "IB & Affiliate Tracking",
        description:
          "Multi-tier IB commission calculation, referral tracking, and automated payout processing directly from the CRM.",
        icon: "Network",
      },
    ],
    benefits: [
      "Eliminate manual account creation errors",
      "Reduce client onboarding time from days to minutes",
      "Full audit trail for KYC/AML compliance",
      "Support for Salesforce, HubSpot, and custom CRMs",
    ],
    useCases: [
      "Brokers with high-volume client acquisition",
      "Regulated brokers needing documented KYC flows",
      "IBs and affiliate networks requiring commission transparency",
    ],
  },

  "client-panel": {
    headline: "Client Panel",
    subtitle:
      "White-label client portal with live account dashboard, deposit/withdrawal flows, and document management — fully branded to your brokerage.",
    features: [
      {
        title: "Account Dashboard",
        description:
          "Clients see live balance, equity, margin, open positions, and trade history in a clean, responsive interface.",
        icon: "LayoutDashboard",
      },
      {
        title: "Deposit & Withdrawal",
        description:
          "Integrated payment gateway support (bank wire, card, crypto) with automated processing and status tracking.",
        icon: "Wallet",
      },
      {
        title: "Document Centre",
        description:
          "Secure document upload for KYC, proof of address, and compliance — with status indicators and admin review tools.",
        icon: "FolderOpen",
      },
      {
        title: "White-Label Branding",
        description:
          "Full customisation of colours, logos, domain, and email templates to match your brokerage identity.",
        icon: "Paintbrush",
      },
    ],
    benefits: [
      "Reduce support tickets by 40% with self-service tools",
      "Mobile-responsive design works on all devices",
      "Multi-language support out of the box",
      "Integrate with any payment provider via webhook API",
    ],
    useCases: [
      "Brokers replacing outdated client areas",
      "White-label partners needing their own branded portal",
      "Brokers adding crypto deposit/withdrawal support",
    ],
  },

  "copytrader-tool": {
    headline: "Copytrader Tool",
    subtitle:
      "Turn your platform into a social trading hub — let followers mirror master traders in real time with full transparency and risk controls.",
    features: [
      {
        title: "Master–Follower Architecture",
        description:
          "Signal providers publish strategies; followers subscribe and auto-copy trades proportionally to their balance or fixed lot size.",
        icon: "Users",
      },
      {
        title: "Real-Time Trade Replication",
        description:
          "Sub-second order mirroring with slippage protection, partial close sync, and pending order propagation across all follower accounts.",
        icon: "RefreshCcw",
      },
      {
        title: "Risk Controls",
        description:
          "Per-follower drawdown limits, max lot caps, symbol filters, and auto-disconnect rules to protect investor capital.",
        icon: "Shield",
      },
      {
        title: "Optional Client Panel",
        description:
          "White-label web panel where followers browse master rankings, view performance charts, and manage subscriptions — or integrate via API.",
        icon: "LayoutDashboard",
      },
    ],
    benefits: [
      "Increase client retention with social trading features",
      "Generate additional revenue through performance fees",
      "Full audit trail for regulatory compliance",
      "Works on both MT4 and MT5 platforms",
    ],
    useCases: [
      "Brokers launching a social or copy trading product",
      "Signal provider marketplaces seeking broker integration",
      "IBs offering managed copy trading portfolios to their network",
    ],
    seoTitle: "Copy Trading Software for MT4 & MT5 Brokers — Copytrader Plugin",
    metaDescription:
      "Copy trading software for FX brokers on MT4 and MT5. Real-time master-to-follower trade replication, white-label panel, performance fees and risk controls. Zero slippage, full audit trail.",
    seoKeywords: [
      "copy trading software",
      "copy trading platform for brokers",
      "MT4 copy trader plugin",
      "MT5 copy trader plugin",
      "social trading platform",
      "copytrader MetaTrader",
      "MAM copy trading",
      "signal provider software",
    ],
    longDescription:
      "The brokerQ.io Copytrader turns any MT4 or MT5 brokerage into a full-featured social trading venue. Signal providers (masters) publish strategies from their standard trading account; followers subscribe and every order — market, pending, partial close, SL/TP modification — is mirrored to their account in under a second, proportionally to balance, equity, or fixed lot size. A built-in risk engine enforces per-follower drawdown limits, max lot caps, symbol blacklists and auto-disconnect rules so broker B-book exposure stays predictable. The optional white-label web panel gives followers a searchable leaderboard, performance charts, subscription management and one-click copy onboarding — or you can consume the REST/WebSocket API headlessly inside your existing client portal.",
    schemaType: "SoftwareApplication",
    platforms: ["MetaTrader 4", "MetaTrader 5"],
    specs: [
      { label: "Replication Latency", value: "< 1 second (typical 200–400 ms)" },
      { label: "Allocation Models", value: "Balance %, equity %, fixed lot, scaled" },
      { label: "Order Types Supported", value: "Market, pending, partial close, SL/TP mod" },
      { label: "Platforms", value: "MT4 + MT5 (hedging & netting)" },
      { label: "Panel", value: "White-label web portal (optional) or headless API" },
      { label: "Performance Fees", value: "High-water-mark, configurable split" },
    ],
    faqs: [
      {
        question: "How is brokerQ.io Copytrader different from MT5 Signals?",
        answer:
          "MT5 Signals is MetaQuotes' consumer marketplace — you can't fully brand it, you share revenue with MetaQuotes, and you have limited control over risk rules. Our Copytrader is a broker-owned plugin: your brand, your revenue split, your risk engine, and it works on both MT4 and MT5 with sub-second replication.",
      },
      {
        question: "Does the copy trading plugin work on both MT4 and MT5?",
        answer:
          "Yes. The same Copytrader supports MT4, MT5 hedging, and MT5 netting accounts — and cross-platform copying (e.g. MT5 master → MT4 follower) is available as an add-on.",
      },
      {
        question: "Can I run copy trading without a dedicated client panel?",
        answer:
          "Yes. The panel is optional. You can integrate Copytrader directly into your existing client area using our REST and WebSocket APIs — subscription management, performance data and leaderboards all exposed for headless use.",
      },
      {
        question: "What risk controls protect the broker from concentrated master exposure?",
        answer:
          "Per-master lot caps, per-symbol exposure ceilings, forced partial unwinding when exposure crosses thresholds, and real-time alerts that integrate with our Risk Monitoring System. You can also segregate copy-trading flow into a dedicated A-book group.",
      },
      {
        question: "How are performance fees calculated and paid out?",
        answer:
          "Fees are computed on a high-water-mark basis per follower per master, with a configurable profit-share percentage. Payouts can be processed automatically from follower to master accounts on a daily, weekly or monthly cycle with full audit logs.",
      },
    ],
  },

  "proptrade-tool": {
    headline: "Proptrade Tool",
    subtitle:
      "End-to-end proprietary trading firm infrastructure — challenge creation, evaluation engine, funded account management, and profit-split automation.",
    features: [
      {
        title: "Challenge & Evaluation Engine",
        description:
          "Configurable multi-phase challenges with profit targets, daily/max drawdown limits, minimum trading days, and auto-pass/fail logic.",
        icon: "Trophy",
      },
      {
        title: "Funded Account Management",
        description:
          "Automatic account provisioning for passed traders with pre-set leverage, instrument filters, and scaling rules.",
        icon: "UserCheck",
      },
      {
        title: "Profit Split Automation",
        description:
          "Configurable profit-sharing ratios with automated payout calculations, withdrawal requests, and settlement reporting.",
        icon: "Wallet",
      },
      {
        title: "Optional Client Panel",
        description:
          "Branded dashboard where traders purchase challenges, track progress, view metrics, and request payouts — or integrate headless via API.",
        icon: "LayoutDashboard",
      },
    ],
    benefits: [
      "Launch a prop firm on your existing MT4/MT5 infrastructure",
      "Fully automated challenge lifecycle reduces manual overhead",
      "Configurable rules engine supports any challenge model",
      "Real-time breach detection prevents rule violations instantly",
    ],
    useCases: [
      "Brokers launching a proprietary trading division",
      "Existing prop firms migrating to in-house technology",
      "White-label prop trading solutions for IBs and partners",
    ],
  },

  "pamm-mamm-plugins": {
    headline: "PAMM / MAMM Plugins",
    subtitle:
      "Institutional-grade Percentage Allocation and Multi-Account Management — automate fund allocation, investor reporting, and performance fee calculations.",
    features: [
      {
        title: "PAMM Allocation Engine",
        description:
          "Proportional allocation based on investor equity share — supports lot, percentage, and equity allocation models with real-time rebalancing.",
        icon: "PieChart",
      },
      {
        title: "MAMM Multi-Account Trading",
        description:
          "Money managers trade from a single master account; positions are distributed across sub-accounts with individual risk parameters.",
        icon: "Users",
      },
      {
        title: "Investor Reporting",
        description:
          "Automated daily/weekly/monthly performance reports, NAV calculations, and watermark-based performance fee computation.",
        icon: "BarChart3",
      },
      {
        title: "Deposit & Withdrawal Handling",
        description:
          "Investor deposits and withdrawals processed without disrupting open positions — automatic share recalculation on the fly.",
        icon: "Wallet",
      },
    ],
    benefits: [
      "Attract professional money managers to your platform",
      "Fully automated fee calculations eliminate manual errors",
      "Real-time NAV and equity updates for full transparency",
      "Compatible with MT4 and MT5 hedging/netting modes",
    ],
    useCases: [
      "Brokers offering managed account services",
      "Fund managers running strategies across multiple investors",
      "IBs packaging managed portfolios for retail clients",
    ],
    seoTitle: "PAMM & MAMM Plugin for MT4 & MT5 — Money Manager Platform",
    metaDescription:
      "Institutional PAMM and MAMM plugin for MT4 and MT5 brokers. Automated allocation, investor reporting, NAV calculation and high-water-mark performance fees for money managers.",
    seoKeywords: [
      "PAMM plugin",
      "MAMM plugin",
      "PAMM MT5",
      "MAMM MT5",
      "PAMM MT4",
      "multi account manager MT5",
      "money manager plugin",
      "percentage allocation management",
    ],
    schemaType: "SoftwareApplication",
    platforms: ["MetaTrader 4", "MetaTrader 5"],
    longDescription:
      "brokerQ.io's PAMM and MAMM plugins let FX brokers host professional money managers without spreadsheets, manual allocations, or fee reconciliation headaches. PAMM runs proportional allocation based on each investor's equity share with automatic rebalancing on deposits and withdrawals. MAMM lets a money manager trade from a single master account while positions are distributed across sub-accounts, each with their own leverage, lot size and risk parameters. Both plugins support high-water-mark performance fees, automated investor reporting, and NAV calculations that hold up to external audit.",
    specs: [
      { label: "Allocation Models", value: "Equity %, balance %, lot allocation" },
      { label: "Fee Models", value: "High-water-mark, hurdle rate, fixed %" },
      { label: "Reporting", value: "Daily / weekly / monthly investor statements" },
      { label: "Platforms", value: "MT4 hedging, MT5 hedging & netting" },
      { label: "Compatibility", value: "Works alongside Copytrader and Risk Monitoring" },
    ],
    faqs: [
      {
        question: "What is the difference between PAMM and MAMM?",
        answer:
          "PAMM (Percentage Allocation Management Module) pools investor funds and allocates profits and losses proportionally to each investor's equity share. MAMM (Multi-Account Management Module) keeps investor accounts separate — a manager trades from a master account and trades are mirrored to sub-accounts, each with independent balance and risk settings. Brokers often offer both.",
      },
      {
        question: "Does the PAMM plugin support MT5?",
        answer:
          "Yes. Our PAMM and MAMM plugins are fully supported on MetaTrader 5 hedging and netting account modes, as well as MetaTrader 4. Cross-platform scenarios (e.g. MT5 manager controlling MT4 investor accounts) are supported as an add-on.",
      },
      {
        question: "How are performance fees calculated?",
        answer:
          "Performance fees are computed on a high-water-mark basis by default, so investors are only charged on new profit above their previous peak equity. Hurdle rates, fixed percentages, and custom schedules are also supported, with fully automated payout and audit logs.",
      },
    ],
  },

  "holiday-swap-manager": {
    headline: "Holiday & Swap Control Manager",
    subtitle:
      "Multi-platform automated swap and holiday schedule management with an intelligent recommendation system — eliminate manual errors and save hours every week.",
    features: [
      {
        title: "Automated Holiday Scheduling",
        description:
          "Pre-loaded global exchange holiday calendar with automatic session and swap adjustments — no more missed rollover changes.",
        icon: "CalendarClock",
      },
      {
        title: "Swap Recommendation Engine",
        description:
          "AI-assisted swap rate suggestions based on interbank rates, LP feeds, and your configured markup — review and apply with one click.",
        icon: "TrendingUp",
      },
      {
        title: "Multi-Platform Support",
        description:
          "Manage swap and holiday settings across multiple MT4/MT5 servers from a single unified interface.",
        icon: "Server",
      },
      {
        title: "Audit & Rollback",
        description:
          "Full change history with diff views and one-click rollback — every swap and holiday modification is logged and reversible.",
        icon: "History",
      },
    ],
    benefits: [
      "Eliminate triple-swap and holiday misconfiguration errors",
      "Save 5+ hours per week on manual swap management",
      "Centralised control across all your trading servers",
      "Automated alerts before upcoming holidays and rollovers",
    ],
    useCases: [
      "Multi-server brokers managing complex holiday schedules",
      "Operations teams spending excessive time on swap updates",
      "Brokers seeking to reduce swap-related client complaints",
    ],
    seoTitle: "Holiday & Swap Control Manager — Automated Swap Rates for MT4/MT5",
    metaDescription:
      "Automated holiday and swap schedule management across MT4 and MT5 servers, with AI-assisted swap recommendations, one-click rollback and unified multi-platform control.",
    seoKeywords: [
      "MetaTrader swap manager",
      "MT4 swap plugin",
      "MT5 swap plugin",
      "broker holiday schedule",
      "swap rate automation",
      "MT5 holiday calendar",
    ],
    schemaType: "SoftwareApplication",
    platforms: ["MetaTrader 4", "MetaTrader 5"],
  },

  "group-spread-swap-analyzer": {
    headline: "Group Spread & Swap Analyzer",
    subtitle:
      "Automated cross-group and cross-symbol analysis of swap and spread configurations — instantly identify anomalies, outliers, and competitive gaps.",
    features: [
      {
        title: "Full Platform Scan",
        description:
          "Scans every group and symbol on your server, comparing spreads and swaps against your baseline and industry benchmarks.",
        icon: "Filter",
      },
      {
        title: "Anomaly Detection",
        description:
          "Flags misconfigured swaps, unusually wide/tight spreads, and group-level inconsistencies that could cost you money or clients.",
        icon: "Bell",
      },
      {
        title: "Competitive Benchmarking",
        description:
          "Compare your spread and swap offerings against configurable benchmarks to ensure you remain competitive in the market.",
        icon: "BarChart3",
      },
      {
        title: "Exportable Reports",
        description:
          "Generate detailed CSV/PDF reports for management review, compliance audits, or LP negotiations.",
        icon: "FileCheck",
      },
    ],
    benefits: [
      "Catch costly misconfigurations before clients do",
      "Ensure consistent pricing across all client groups",
      "Data-driven insights for spread and swap optimisation",
      "Reduce time spent manually reviewing symbol settings",
    ],
    useCases: [
      "Brokers with many groups needing consistent pricing oversight",
      "Risk teams auditing swap configurations after LP changes",
      "Operations teams onboarding new symbols or liquidity providers",
    ],
  },

  "report-tool": {
    headline: "Report Tool",
    subtitle:
      "Automated broker reporting — design a report once and run it on any date range and account filter, with scheduled delivery of volume, commission and P&L summaries across your MT4/MT5 servers.",
    features: [
      {
        title: "Report Templates",
        description:
          "Design reusable report templates with custom columns, date parameters and account filters — run the same report across any period without rebuilding it.",
        icon: "FileCheck",
      },
      {
        title: "Scheduled Delivery",
        description:
          "Schedule daily, weekly or monthly reports to run automatically and land in your inbox or export folder — no manual pulls.",
        icon: "CalendarClock",
      },
      {
        title: "Volume, Commission & P&L",
        description:
          "Ready-made breakdowns of trading volume, commissions, swaps and group-level P&L across all servers and symbols.",
        icon: "BarChart3",
      },
      {
        title: "Multi-Server Consolidation",
        description:
          "Aggregate reporting across multiple MT4 and MT5 servers into a single consolidated view for management and regulators.",
        icon: "Server",
      },
    ],
    benefits: [
      "Replace manual spreadsheet pulls with scheduled, repeatable reports",
      "Consistent reporting across every MT4/MT5 server",
      "Faster month-end close and regulatory reporting",
      "Template-based design means non-technical staff can run reports",
    ],
    useCases: [
      "Daily volume and commission reporting for management",
      "Regulatory and audit exports on a fixed schedule",
      "IB / partner performance and rebate reporting",
    ],
    seoTitle: "Broker Report Tool — Automated MT4/MT5 Reporting & Scheduling",
    metaDescription:
      "Automate FX broker reporting: design report templates once, schedule daily/weekly/monthly runs, and consolidate volume, commission and P&L across all your MT4/MT5 servers.",
    seoKeywords: [
      "broker reporting tool",
      "MT4 MT5 reporting",
      "automated broker reports",
      "trading volume report",
      "commission report",
      "broker P&L report",
      "scheduled broker reporting",
    ],
    longDescription:
      "The brokerQ.io Report Tool turns broker reporting from a manual, error-prone spreadsheet job into a repeatable, scheduled process. You design a report template once — choosing columns, date parameters, account filters and grouping — and then run it on any date range, or schedule it to run automatically every day, week or month. Out of the box it produces trading volume breakdowns, commission and swap summaries, deposit/withdrawal reports and group-level P&L across all of your MetaTrader 4 and MetaTrader 5 servers, consolidated into a single view. Because templates are reusable and non-technical, your operations and finance teams can self-serve the numbers they need for management, partners and regulators without waiting on engineering.",
    schemaType: "SoftwareApplication",
    platforms: ["MetaTrader 4", "MetaTrader 5"],
    specs: [
      { label: "Report Design", value: "Reusable templates with custom columns & filters" },
      { label: "Scheduling", value: "Daily / weekly / monthly automated runs" },
      { label: "Coverage", value: "Volume, commission, swap, deposits, P&L" },
      { label: "Servers", value: "Multi-server MT4 & MT5 consolidation" },
      { label: "Delivery", value: "Email / export on schedule" },
    ],
    faqs: [
      {
        question: "Can I schedule reports to run automatically?",
        answer:
          "Yes. Any report template can be scheduled to run daily, weekly or monthly and delivered automatically, so management and finance receive the numbers without manual pulls.",
      },
      {
        question: "Does the Report Tool work across multiple MT4/MT5 servers?",
        answer:
          "Yes. It consolidates reporting across all of your MetaTrader 4 and MetaTrader 5 servers into a single view, which is ideal for multi-server brokers and group-level reporting.",
      },
      {
        question: "What kind of reports can it produce?",
        answer:
          "Trading volume breakdowns, commission and swap summaries, deposit/withdrawal reports and group-level P&L, all filterable by date range, group, account or symbol.",
      },
      {
        question: "Do I need technical staff to build reports?",
        answer:
          "No. Reports are built from reusable templates with a point-and-click column, filter and date-parameter design, so operations and finance teams can create and run reports themselves.",
      },
    ],
  },

  "grey-label": {
    headline: "Grey Label Solution",
    subtitle:
      "Run your own branded brokerage on our MT4/MT5 infrastructure — your name, your spreads, your clients — without buying and maintaining a full white-label server licence.",
    features: [
      {
        title: "Your Brand, Our Infrastructure",
        description:
          "Operate under your own brand, domain and client portal while trades route through our regulated MT4/MT5 servers and liquidity.",
        icon: "Paintbrush",
      },
      {
        title: "Own Spreads & Markups",
        description:
          "Set your own group spreads, commissions and swap markups per symbol and keep the full mark-up as revenue.",
        icon: "TrendingUp",
      },
      {
        title: "Dedicated Manager Access",
        description:
          "A manager login scoped to your own client groups for onboarding, deposits/withdrawals and reporting — with no server-admin overhead.",
        icon: "UserCheck",
      },
      {
        title: "Fast Go-Live",
        description:
          "Launch in days, not months: no server provisioning, data-centre contracts or bridge licensing to procure.",
        icon: "Gauge",
      },
    ],
    benefits: [
      "Launch a branded brokerage without full white-label capital outlay",
      "Keep 100% of your spread and commission mark-up",
      "No server, data-centre or bridge licences to manage",
      "Upgrade to your own dedicated server whenever you outgrow grey label",
    ],
    useCases: [
      "Introducing brokers ready to run their own book",
      "Regional partners launching a local brand quickly",
      "New brokerages validating a market before a full white-label build",
    ],
    seoTitle: "Grey Label Brokerage Solution — Branded MT4/MT5 Without a White Label",
    metaDescription:
      "Launch a branded FX brokerage on our MT4/MT5 infrastructure with a grey label: your name, spreads and clients, your own markups and a dedicated manager — without full white-label cost.",
    seoKeywords: [
      "grey label brokerage",
      "grey label MT4 MT5",
      "grey label forex",
      "grey label vs white label",
      "branded broker solution",
      "MetaTrader grey label",
      "forex grey label provider",
    ],
    longDescription:
      "A grey label sits between an introducing-broker arrangement and a full white label: you get your own brand, client portal and pricing control, but you run on our existing regulated MetaTrader 4 and MetaTrader 5 servers and liquidity instead of buying and maintaining your own server licence. You define your client groups, set your own spreads, commissions and swap markups, and keep the full mark-up as revenue — while we handle the platform, data-centre, bridge and infrastructure maintenance behind the scenes. It is the fastest, lowest-capital way to go live as a branded brokerage, and when your volumes justify it you can graduate to a dedicated white-label server with a zero-downtime grey label migration.",
    schemaType: "Service",
    specs: [
      { label: "Model", value: "Grey label on shared MT4/MT5 servers" },
      { label: "Branding", value: "Your name, domain & client portal" },
      { label: "Pricing Control", value: "Own spreads, commissions & swap markups" },
      { label: "Setup Time", value: "Typically 3–10 business days" },
      { label: "Upgrade Path", value: "Migrate to dedicated white-label server anytime" },
    ],
    faqs: [
      {
        question: "What is the difference between a grey label and a white label?",
        answer:
          "A white label means you license and operate your own dedicated MT4/MT5 server under your brand, with full control and higher cost. A grey label gives you your own brand, client portal and pricing control while running on our shared, already-licensed servers — so you go live faster and with far less capital, at the trade-off of not owning the server itself.",
      },
      {
        question: "Can I set my own spreads and commissions on a grey label?",
        answer:
          "Yes. You get manager-level control over your own client groups, so you define spreads, commissions and swap markups per symbol and keep the full mark-up as your revenue.",
      },
      {
        question: "How quickly can a grey label go live?",
        answer:
          "Because there is no server to provision or bridge to license, most grey labels are live within 3 to 10 business days once branding, group configuration and client-portal setup are complete.",
      },
      {
        question: "Can I move from a grey label to my own server later?",
        answer:
          "Absolutely. When your volumes justify a dedicated server we run a zero-downtime grey label migration that moves your accounts, balances and full trading history to your own white-label MT4/MT5 environment.",
      },
    ],
  },

  "grey-label-migration": {
    headline: "Grey Label Migration",
    subtitle:
      "Move your grey label client book between master brokers, or graduate to your own dedicated server, with accounts, balances and full trading history transferred at zero downtime.",
    features: [
      {
        title: "Book Portability",
        description:
          "Transfer your entire grey label book — accounts, groups, balances and leverage — from one master broker to another without clients re-registering.",
        icon: "RefreshCcw",
      },
      {
        title: "History Preservation",
        description:
          "Closed orders, deal history and equity curves move with the accounts so clients keep their full track record after the switch.",
        icon: "History",
      },
      {
        title: "Open Position Transfer",
        description:
          "Live positions are carried over with a price-lock cut-over to avoid slippage during the switch window.",
        icon: "ArrowRightLeft",
      },
      {
        title: "Grey-to-White Upgrade",
        description:
          "Graduate from a shared grey label onto your own dedicated white-label MT4/MT5 server as a single, reconciled migration.",
        icon: "Server",
      },
    ],
    benefits: [
      "Switch master brokers without asking clients to re-register",
      "Retain full trade history and open positions across the move",
      "Zero trading downtime with a price-locked cut-over",
      "Clean upgrade path from grey label to a dedicated server",
    ],
    useCases: [
      "Grey label brokers changing their master or liquidity provider",
      "Brokers upgrading from a grey label to their own white-label server",
      "Consolidating multiple grey label books under one master",
    ],
    seoTitle: "Grey Label Migration — Move Your Broker Book Between Servers, Zero Downtime",
    metaDescription:
      "Migrate a grey label FX book between master brokers or upgrade to your own MT4/MT5 server. Accounts, balances, full history and open positions transferred with a price-locked, zero-downtime cut-over.",
    seoKeywords: [
      "grey label migration",
      "broker book migration",
      "change master broker",
      "grey label to white label",
      "MT4 MT5 book transfer",
      "broker account migration",
      "zero downtime broker migration",
    ],
    longDescription:
      "Grey label migration moves an entire branded client book from one MetaTrader environment to another — whether you are switching master brokers, consolidating several grey label books, or upgrading from a shared grey label onto your own dedicated white-label server. Every account, group, balance, leverage setting, closed trade, deal record and open position is transferred and reconciled so clients never re-register and never lose their history. The cut-over uses the same staged, price-locked engine as our MT4-to-MT5 migration: your current environment stays live during preparation, the switch itself runs in a sub-minute maintenance window with no slippage, and a full pre-migration snapshot is retained for rollback. It is the safe way to change providers or take ownership of your infrastructure without disrupting your traders.",
    schemaType: "SoftwareApplication",
    platforms: ["MetaTrader 4", "MetaTrader 5"],
    specs: [
      { label: "Migration Type", value: "Grey label book transfer / grey-to-white" },
      { label: "Trading Downtime", value: "< 60 seconds" },
      { label: "Data Migrated", value: "Accounts, groups, balances, history, open positions" },
      { label: "Rollback Window", value: "30 days post cut-over" },
      { label: "Typical Timeline", value: "1–3 weeks end-to-end" },
    ],
    faqs: [
      {
        question: "Will my clients have to re-register after a grey label migration?",
        answer:
          "No. Accounts, logins, balances and groups are transferred intact, so from the client's perspective their account simply continues — no re-registration and no lost history.",
      },
      {
        question: "Can I move from a grey label to my own white-label server?",
        answer:
          "Yes, that is one of the most common uses. We migrate your full grey label book onto your own dedicated MT4/MT5 server in a single reconciled cut-over, so you take ownership of your infrastructure without disrupting traders.",
      },
      {
        question: "Do open positions and trade history survive the migration?",
        answer:
          "Yes. Closed orders, deal history and equity curves are preserved, and open positions are carried across with a price-lock mechanism that eliminates slippage during the switch.",
      },
      {
        question: "How much downtime is involved?",
        answer:
          "The production cut-over runs in a single maintenance window of under 60 seconds of trading downtime. All preparation and reconciliation happens while your current environment stays fully live.",
      },
    ],
  },

  "license-consulting": {
    headline: "Offshore & Onshore License Consulting",
    subtitle:
      "Expert guidance through the broker licensing process — from jurisdiction selection to application submission — for both offshore and onshore regulatory frameworks.",
    features: [
      {
        title: "Jurisdiction Analysis",
        description:
          "Comparative analysis of offshore (SVG, Vanuatu, Seychelles, Comoros) and onshore (CySEC, FCA, ASIC, DFSA) jurisdictions based on your business model.",
        icon: "Globe",
      },
      {
        title: "Application Preparation",
        description:
          "End-to-end document preparation: business plans, compliance manuals, AML/KYC policies, and capital adequacy documentation.",
        icon: "FileCheck",
      },
      {
        title: "Compliance Framework Setup",
        description:
          "Design and implementation of internal compliance structures, reporting frameworks, and risk management policies required by regulators.",
        icon: "ShieldCheck",
      },
      {
        title: "Ongoing Advisory",
        description:
          "Post-license support: regulatory reporting, annual audits, licence renewals, and guidance on regulatory changes affecting your operations.",
        icon: "UserCheck",
      },
    ],
    benefits: [
      "Reduce licensing timeline with experienced guidance",
      "Avoid costly application rejections and resubmissions",
      "Jurisdiction recommendations tailored to your target markets",
      "Compliance frameworks that satisfy both regulators and banks",
    ],
    useCases: [
      "Startups launching a new brokerage from scratch",
      "Existing brokers expanding into new regulated jurisdictions",
      "Offshore brokers upgrading to onshore tier-1 licences",
    ],
  },

  "crypto-gateway": {
    headline: "Crypto Gateway",
    subtitle:
      "Automated cryptocurrency payment infrastructure — unique wallets per customer, real-time deposit detection, auto-sweep to cold storage, and instant account crediting.",
    features: [
      {
        title: "Per-Customer Wallets",
        description:
          "Automatically generate unique deposit addresses for each client across BTC, ETH, USDT (TRC-20/ERC-20), and other supported chains.",
        icon: "Wallet",
      },
      {
        title: "Auto-Sweep to Cold Storage",
        description:
          "Incoming deposits are automatically swept to your cold wallet after configurable confirmation thresholds — minimise hot wallet exposure.",
        icon: "Shield",
      },
      {
        title: "Instant Account Crediting",
        description:
          "Client trading accounts are credited in real time upon confirmed deposit — no manual intervention or delays.",
        icon: "RefreshCcw",
      },
      {
        title: "Transaction Dashboard",
        description:
          "Full admin panel showing deposit/withdrawal status, blockchain confirmations, wallet balances, and reconciliation tools.",
        icon: "LayoutDashboard",
      },
    ],
    benefits: [
      "Eliminate manual crypto deposit processing",
      "Reduce hot wallet risk with automatic cold storage sweeps",
      "Support multiple chains and tokens from a single integration",
      "Full blockchain audit trail for compliance and reconciliation",
    ],
    useCases: [
      "Brokers accepting cryptocurrency deposits",
      "Exchanges needing automated wallet management",
      "Fintech platforms integrating crypto payment rails",
    ],
  },

  "stock-datafeed": {
    headline: "Stock Datafeed",
    subtitle:
      "Real-time and historical stock market data feed integration for MT4/MT5 — equities, indices, and commodities from global exchanges, delivered with institutional reliability.",
    features: [
      {
        title: "Multi-Exchange Coverage",
        description:
          "Live price feeds from NYSE, NASDAQ, LSE, HKEX, and 20+ global exchanges — equities, ETFs, indices, and commodity futures.",
        icon: "LineChart",
      },
      {
        title: "Low-Latency Delivery",
        description:
          "Optimised feed handlers deliver tick-by-tick data with sub-100ms latency, ensuring your clients see accurate, real-time prices.",
        icon: "Gauge",
      },
      {
        title: "Historical Data Backfill",
        description:
          "Automated historical bar import for charting — M1 through MN1 timeframes, so new symbols have full chart history from day one.",
        icon: "History",
      },
      {
        title: "Symbol Management",
        description:
          "Centralised configuration for symbol mapping, session schedules, commission structures, and contract specifications.",
        icon: "Server",
      },
    ],
    benefits: [
      "Expand your product offering with real stock trading",
      "Institutional-grade data quality and reliability",
      "Seamless integration with existing MT4/MT5 infrastructure",
      "Flexible licensing: per-exchange or full global package",
    ],
    useCases: [
      "Brokers adding stock CFDs to their instrument lineup",
      "Multi-asset brokers needing reliable equity data feeds",
      "Regional brokers expanding to international equity markets",
    ],
  },
};
