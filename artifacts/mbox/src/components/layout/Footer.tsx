import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a1a] border-t border-[#2a2a4a] pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company */}
          <div>
            <div className="flex items-center mb-6">
              <Link href="/">
                <span className="text-[#00d4aa] font-bold text-2xl tracking-tighter cursor-pointer">MBox</span>
              </Link>
            </div>
            <p className="text-[#a7a7b8] mb-6">
              Enterprise-grade platform tools, migration services, and risk management for FX brokers worldwide.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-6">Products</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  MT5 Migration
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  Risk Monitoring
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  CRM Integration
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  Client Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a7a7b8] hover:text-[#00d4aa] transition-colors">
                  System Status
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="text-[#a7a7b8]">sales@mbox.dev</li>
              <li className="text-[#a7a7b8]">support@mbox.dev</li>
              <li className="text-[#a7a7b8] mt-4">
                120 Broker Lane
                <br />
                London, EC2M 4YD
                <br />
                United Kingdom
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2a2a4a] pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-[#a7a7b8] text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} MBox Technologies. All rights reserved. MetaTrader is a registered
            trademark of MetaQuotes Software Corp.
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
