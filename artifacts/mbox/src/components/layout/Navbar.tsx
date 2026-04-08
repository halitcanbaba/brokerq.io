import React from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a1a]/80 backdrop-blur-md border-b border-[#2a2a4a]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="link-logo">
            <span className="text-[#00d4aa] font-bold text-2xl tracking-tighter">MBox</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('products')} className="text-sm font-medium text-[#a7a7b8] hover:text-[#00d4aa] transition-colors" data-testid="nav-products">Products</button>
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-[#a7a7b8] hover:text-[#00d4aa] transition-colors" data-testid="nav-features">Features</button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-[#a7a7b8] hover:text-[#00d4aa] transition-colors" data-testid="nav-about">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-[#a7a7b8] hover:text-[#00d4aa] transition-colors" data-testid="nav-contact">Contact</button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button onClick={() => scrollToSection('contact')} className="bg-[#00d4aa] hover:bg-[#00b38f] text-[#0a0a1a] font-semibold" data-testid="btn-contact-sales">
              Contact Sales
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#00d4aa]" data-testid="btn-mobile-menu">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#111127] border-b border-[#2a2a4a]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <button onClick={() => scrollToSection('products')} className="block px-3 py-2 text-base font-medium text-[#a7a7b8] hover:text-[#00d4aa]" data-testid="mobile-nav-products">Products</button>
            <button onClick={() => scrollToSection('features')} className="block px-3 py-2 text-base font-medium text-[#a7a7b8] hover:text-[#00d4aa]" data-testid="mobile-nav-features">Features</button>
            <button onClick={() => scrollToSection('about')} className="block px-3 py-2 text-base font-medium text-[#a7a7b8] hover:text-[#00d4aa]" data-testid="mobile-nav-about">About</button>
            <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 text-base font-medium text-[#a7a7b8] hover:text-[#00d4aa]" data-testid="mobile-nav-contact">Contact</button>
            <div className="px-3 py-2">
              <Button onClick={() => scrollToSection('contact')} className="w-full bg-[#00d4aa] hover:bg-[#00b38f] text-[#0a0a1a] font-semibold" data-testid="mobile-btn-contact-sales">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
