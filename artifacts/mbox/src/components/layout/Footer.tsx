import { Link } from "wouter";
import { useBrand } from "@/hooks/use-brand";

export default function Footer() {
  const { siteName, email, supportEmail } = useBrand();
  return (
    <footer className="bg-[#0a0a1a] border-t border-[#2a2a4a] pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Company */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <Link href="/">
                <span className="text-[#00d4aa] font-bold text-2xl tracking-tighter cursor-pointer">{siteName}</span>
              </Link>
            </div>
            <p className="text-[#a7a7b8] mb-6">
              Enterprise-grade platform tools, MetaTrader plugin development, migration services,
              copy trading, PAMM/MAMM and risk management for FX brokers worldwide.
            </p>
          </div>

          {/* Platform & Migration */}
          <nav aria-label="Platform & Migration">
            <h4 className="text-white font-semibold mb-6">Platform & Migration</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products/mt-platform-installation" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  MT4 / MT5 Installation
                </Link>
              </li>
              <li>
                <Link href="/products/mt5-migration-tool" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  MT4 → MT5 Migration
                </Link>
              </li>
              <li>
                <Link href="/products/mt4-migration-tool" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  MT4 Server Migration
                </Link>
              </li>
              <li>
                <Link href="/products/server-maintenance" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  Server Maintenance
                </Link>
              </li>
              <li>
                <Link href="/services/metatrader-plugins" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  MetaTrader Plugins
                </Link>
              </li>
            </ul>
          </nav>

          {/* Plugins & Trading */}
          <nav aria-label="Plugins & Trading">
            <h4 className="text-white font-semibold mb-6">Plugins & Trading</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products/copytrader-tool" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  Copy Trading
                </Link>
              </li>
              <li>
                <Link href="/products/pamm-mamm-plugins" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  PAMM / MAMM
                </Link>
              </li>
              <li>
                <Link href="/products/proptrade-tool" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  Prop Trading
                </Link>
              </li>
              <li>
                <Link href="/products/risk-monitoring-system" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  Risk Management
                </Link>
              </li>
              <li>
                <Link href="/products/holiday-swap-manager" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  Holiday & Swap Manager
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/demos" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  Live Demos
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  Contact
                </Link>
              </li>
              <li className="text-[#a7a7b8] pt-2 border-t border-[#2a2a4a]">{email}</li>
              <li className="text-[#a7a7b8]">{supportEmail}</li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-[#2a2a4a] pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-[#a7a7b8] text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-[#a7a7b8] hover:text-[#00d4aa] text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#a7a7b8] hover:text-[#00d4aa] text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

