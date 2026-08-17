export interface DemoProject {
  /** URL-safe id, also the folder name under /public/demos/<id>/ for screenshots. */
  id: string;
  title: string;
  description: string;
  /** Live demo URL. Omitted for contact-only cards. */
  url?: string;
  /** Category badge label. */
  category: string;
  /** Lucide icon name (must exist in DemoCard's iconMap). */
  icon: string;
  /** Related internal product page, if any. */
  productId?: string;
  /** Screenshot paths (public/) cycled on hover. */
  screenshots: string[];
  /** Shared demo login. Omitted for contact-only cards. */
  credentials?: {
    username: string;
    password: string;
  };
  /**
   * When true, the card hides credentials/live-launch and instead points the
   * visitor to the contact page to request a private demo.
   */
  contactOnly?: boolean;
}

const DEMO_CREDENTIALS = { username: "demo", password: "demo123456" };

function shots(id: string, count: number, ext: "png" | "svg" = "svg"): string[] {
  return Array.from({ length: count }, (_, i) => `/demos/${id}/${i + 1}.${ext}`);
}

export const demoProjects: DemoProject[] = [
  {
    id: "reporttool",
    title: "Report Tool",
    description:
      "Automated broker reporting suite — scheduled daily/weekly reports, trading volume breakdowns, commission and P&L summaries across MT4/MT5 servers.",
    url: "https://reporttool.brokerq.io",
    category: "Reporting",
    icon: "BarChart3",
    productId: "group-spread-swap-analyzer",
    screenshots: shots("reporttool", 3, "png"),
    credentials: DEMO_CREDENTIALS,
  },
  {
    id: "riskmonitor",
    title: "Risk Monitor",
    description:
      "Real-time exposure and risk monitoring — live book overview, per-symbol net exposure, margin alerts and automated hedging analytics for dealing desks.",
    url: "https://riskmonitor.brokerq.io",
    category: "Risk",
    icon: "Shield",
    productId: "risk-monitoring-system",
    screenshots: shots("riskmonitor", 3, "png"),
    credentials: DEMO_CREDENTIALS,
  },
  {
    id: "copytrader",
    title: "Copy Trader",
    description:
      "Copy trading platform — master/follower account linking, proportional lot mapping, performance leaderboards and real-time trade mirroring.",
    url: "https://copytrader.brokerq.io",
    category: "Trading",
    icon: "Copy",
    productId: "copytrader-tool",
    screenshots: shots("copytrader", 3, "png"),
    credentials: DEMO_CREDENTIALS,
  },
  {
    id: "proptool",
    title: "Prop Tool",
    description:
      "Prop firm management platform — challenge phases, evaluation rules, funded account provisioning, breach detection and profit-split automation.",
    url: "https://prop.bitaker.io",
    category: "Trading",
    icon: "Trophy",
    productId: "proptrade-tool",
    screenshots: shots("proptool", 3),
    credentials: DEMO_CREDENTIALS,
  },
  {
    id: "migrator",
    title: "MT5 → MT5 Migrator",
    description:
      "Server-to-server MT5 migration tool — connection profiles, staged migrate/prep runs, live execution logs, account & position verification with drift detection.",
    category: "Migration",
    icon: "ArrowRightLeft",
    productId: "mt5-migration-tool",
    screenshots: shots("migrator", 3, "png"),
    contactOnly: true,
  },
  {
    id: "pay",
    title: "brokerQ Pay",
    description:
      "Crypto payment gateway — per-customer deposit wallets, instant trading account crediting, auto-sweep to cold storage and full transaction audit trail.",
    category: "Gateway",
    icon: "Wallet",
    productId: "crypto-gateway",
    screenshots: shots("pay", 3, "png"),
    contactOnly: true,
  },
];
