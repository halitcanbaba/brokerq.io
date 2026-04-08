import { Product } from "../types";

export const products: Product[] = [
  {
    id: "mt-platform-installation",
    title: "MT5 & MT4 Platform Installation",
    description: "Complete broker platform setup, configuration, and optimization for MetaTrader 4 and 5 environments.",
    category: "Platform",
    icon: "Server"
  },
  {
    id: "server-maintenance",
    title: "Server Maintenance",
    description: "24/7 monitoring, patching, and performance tuning for your MetaTrader server infrastructure.",
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
    title: "Risk Monitoring System",
    description: "Real-time exposure monitoring, automated alerts, and risk analytics for broker desk operations.",
    category: "Risk",
    icon: "Shield"
  },
  {
    id: "crm-integrated",
    title: "CRM Integrated to MetaTrader",
    description: "Bi-directional CRM sync: client lifecycle management, KYC workflows, and MetaTrader account provisioning.",
    category: "CRM",
    icon: "Users"
  },
  {
    id: "client-panel",
    title: "Client Panel",
    description: "White-label client portal with live account dashboard, deposit/withdrawal flows, and document management.",
    category: "Portal",
    icon: "LayoutDashboard"
  }
];
