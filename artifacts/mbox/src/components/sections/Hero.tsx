import { motion, type Variants } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useBrand } from "@/hooks/use-brand";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Hero({ searchQuery, setSearchQuery }: HeroProps) {
  const { siteName } = useBrand();
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Glow effect behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.10) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight"
          >
            Broker Solutions by <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4aa] to-[#0ea5e9]">
              {siteName}
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-[#a7a7b8] max-w-2xl mx-auto leading-relaxed"
          >
            Enterprise-grade MT4/MT5 platform installation, zero-downtime migration, real-time risk monitoring, and CRM integration — purpose-built for FX brokers.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="max-w-xl mx-auto pt-8 relative"
          >
            <div className="relative group">
              <div className="absolute inset-0 rounded-lg opacity-25 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(0,212,170,0.6) 0%, rgba(14,165,233,0.4) 50%, transparent 80%)' }} />
              <div className="relative flex items-center bg-[#111127] border border-[#2a2a4a] rounded-lg overflow-hidden focus-within:border-[#00d4aa] transition-colors">
                <div className="pl-4 text-[#a7a7b8]">
                  <Search className="w-5 h-5" />
                </div>
                <Input
                  type="text"
                  placeholder="Search products, services, integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search broker products and services"
                  className="border-0 bg-transparent text-white placeholder:text-[#a7a7b8] focus-visible:ring-0 focus-visible:ring-offset-0 h-14 text-lg"
                  data-testid="input-hero-search"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
