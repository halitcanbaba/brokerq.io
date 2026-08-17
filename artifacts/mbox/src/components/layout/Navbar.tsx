import React from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrand } from "@/hooks/use-brand";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [location] = useLocation();
  const { logoText } = useBrand();
  const isHome = location === "/";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const NavLink = ({
    href,
    sectionId,
    label,
    testId,
  }: {
    href: string;
    sectionId?: string;
    label: string;
    testId: string;
  }) => {
    if (isHome && sectionId) {
      return (
        <button
          onClick={() => scrollToSection(sectionId)}
          className="text-sm font-medium text-[#a7a7b8] hover:text-[#00d4aa] transition-colors"
          data-testid={testId}
        >
          {label}
        </button>
      );
    }
    return (
      <Link
        href={href}
        className="text-sm font-medium text-[#a7a7b8] hover:text-[#00d4aa] transition-colors"
        data-testid={testId}
      >
        {label}
      </Link>
    );
  };

  const MobileNavLink = ({
    href,
    sectionId,
    label,
    testId,
  }: {
    href: string;
    sectionId?: string;
    label: string;
    testId: string;
  }) => {
    if (isHome && sectionId) {
      return (
        <button
          onClick={() => scrollToSection(sectionId)}
          className="block w-full text-left px-3 py-2 text-base font-medium text-[#a7a7b8] hover:text-[#00d4aa]"
          data-testid={testId}
        >
          {label}
        </button>
      );
    }
    return (
      <Link
        href={href}
        onClick={() => setIsMobileMenuOpen(false)}
        className="block px-3 py-2 text-base font-medium text-[#a7a7b8] hover:text-[#00d4aa]"
        data-testid={testId}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a1a]/95 border-b border-[#2a2a4a]" style={{ willChange: 'transform' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" data-testid="link-logo">
            <span className="text-[#00d4aa] font-bold text-2xl tracking-tighter cursor-pointer">{logoText}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/products" sectionId="products" label="Products" testId="nav-products" />
            <NavLink href="/demos" label="Demos" testId="nav-demos" />
            <NavLink href="/" sectionId="features" label="Features" testId="nav-features" />
            <NavLink href="/about" label="About" testId="nav-about" />
            <NavLink href="/contact" label="Contact" testId="nav-contact" />
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contact">
              <Button
                className="bg-[#00d4aa] hover:bg-[#00b38f] text-[#0a0a1a] font-semibold"
                data-testid="btn-contact-sales"
              >
                Contact Sales
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#00d4aa]"
              data-testid="btn-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#111127] border-b border-[#2a2a4a]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <MobileNavLink href="/products" sectionId="products" label="Products" testId="mobile-nav-products" />
            <MobileNavLink href="/demos" label="Demos" testId="mobile-nav-demos" />
            <MobileNavLink href="/" sectionId="features" label="Features" testId="mobile-nav-features" />
            <MobileNavLink href="/about" label="About" testId="mobile-nav-about" />
            <MobileNavLink href="/contact" label="Contact" testId="mobile-nav-contact" />
            <div className="px-3 py-2">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  className="w-full bg-[#00d4aa] hover:bg-[#00b38f] text-[#0a0a1a] font-semibold"
                  data-testid="mobile-btn-contact-sales"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
