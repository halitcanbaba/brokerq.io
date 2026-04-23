import { Product } from "../types";

export const products: Product[] = [
  {
    id: "mt-platform-installation",
    title: "MT5 & MT4 Platform Installation",
    description: "Complete broker platform setup, configuration, and optimization for MT4 and MT5 environments.",
    category: "Platform",
    icon: "Server"
  },
  {
    id: "server-maintenance",
    title: "Server Maintenance",
    description: "24/7 monitoring, patching, and performance tuning for your trading server infrastructure.",
    category: "Infrastructure",
    icon: "Wrench"
  },
  {
    id: "mt5-migration-tool",
    title: "MT5 Migration Tool",
    description: "Seamlessly migrate client accounts, trading history, and open positions from MT4 to MT5.",
    category: "Migration",
    icon: "ArrowRightLeft"
  },
  {
    id: "mt4-migration-tool",
    title: "MT4 Migration Tool",
    description: "Automated migration utilities to transfer data between MT4 server instances with zero downtime.",
    category: "Migration",
    icon: "ArrowLeftRight"
  },
  {
    id: "risk-monitoring-system",
    title: "Risk Management",
    description: "Comprehensive risk management suite: real-time exposure monitoring, hedging analytics, automated alerts, and P&L controls for broker operations.",
    category: "Risk",
    icon: "Shield"
  },
  {
    id: "crm-integrated",
    title: "CRM Integration",
    description: "Bi-directional CRM sync: client lifecycle management, KYC workflows, and trading account provisioning.",
    category: "CRM",
    icon: "Users"
  },
  {
    id: "client-panel",
    title: "Client Panel",
    description: "White-label client portal with live account dashboard, deposit/withdrawal flows, and document management.",
    category: "Portal",
    icon: "LayoutDashboard"
  },
  {
    id: "copytrader-tool",
    title: "Copytrader Tool",
    description: "Copy trading solution enabling followers to mirror master trader positions in real time, with or without a dedicated client panel.",
    category: "Trading",
    icon: "Copy"
  },
  {
    id: "proptrade-tool",
    title: "Proptrade Tool",
    description: "Proprietary trading firm management: challenges, evaluations, funded account provisioning, and profit-split automation — with or without client panel.",
    category: "Trading",
    icon: "Trophy"
  },
  {
    id: "pamm-mamm-plugins",
    title: "PAMM / MAMM Plugins",
    description: "Percentage and Multi-Account Manager plugins for automated fund allocation, investor reporting, and performance fee calculations.",
    category: "Trading",
    icon: "PieChart"
  },
  {
    id: "holiday-swap-manager",
    title: "Holiday & Swap Control Manager",
    description: "Multi-platform automated holiday schedule and swap rate management with intelligent swap recommendation system.",
    category: "Platform",
    icon: "CalendarClock"
  },
  {
    id: "group-spread-swap-analyzer",
    title: "Group Spread & Swap Analyzer",
    description: "Automated analysis of all groups and symbols for swap and spread configurations — flags anomalies and inconsistencies across your platform.",
    category: "Risk",
    icon: "BarChart3"
  },
  {
    id: "license-consulting",
    title: "Offshore & Onshore License Consulting",
    description: "Expert guidance for broker licensing: offshore (SVG, Vanuatu, Seychelles) and onshore (CySEC, FCA, ASIC) regulatory frameworks and application processes.",
    category: "Consulting",
    icon: "Globe"
  },
  {
    id: "crypto-gateway",
    title: "Crypto Gateway",
    description: "Per-customer crypto wallets with auto-sweep to your cold storage — incoming deposits are instantly credited to client trading accounts.",
    category: "Gateway",
    icon: "Wallet"
  },
  {
    id: "stock-datafeed",
    title: "Stock Datafeed",
    description: "Real-time stock market data feed integration for MT4/MT5 platforms — equities, indices, and commodities from global exchanges.",
    category: "Platform",
    icon: "LineChart"
  }
];
